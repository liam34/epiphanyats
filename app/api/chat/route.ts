import { NextRequest } from "next/server";
import {
  containsSensitiveData,
  SENSITIVE_CONTENT_MESSAGE,
} from "@/lib/chat-safety";
import { SYSTEM_PROMPT } from "@/lib/chatbot-knowledge";

export const runtime = "nodejs";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// Fast, low-cost default on OpenRouter. Override via CHATBOT_MODEL in .env.local
// (e.g. "anthropic/claude-sonnet-4.5" or "openai/gpt-4o-mini").
const MODEL = process.env.CHATBOT_MODEL ?? "anthropic/claude-haiku-4.5";

const MAX_MESSAGES = 20; // keep only the most recent turns
const MAX_CHARS = 2000; // per message
const RATE_LIMIT = 20; // requests per window per IP
const WINDOW_MS = 60_000;

// Simple in-memory limiter. Fine for one server instance; use Upstash/Redis
// or your host's rate limiting if you run several instances.
const hits = new Map<string, { count: number; reset: number }>();

function isLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function cleanMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input)) return null;
  const messages: ChatMessage[] = [];
  for (const m of input.slice(-MAX_MESSAGES)) {
    if (
      !m ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      !m.content.trim()
    ) {
      return null;
    }
    messages.push({ role: m.role, content: m.content.slice(0, MAX_CHARS) });
  }
  // The API requires the conversation to start with a user message.
  while (messages.length && messages[0].role !== "user") messages.shift();
  return messages.length ? messages : null;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isLimited(ip)) {
    return new Response("Too many messages. Please wait a minute and try again.", {
      status: 429,
    });
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid request.", { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("Missing OPENROUTER_API_KEY");
    return new Response("Chat service is not configured.", { status: 500 });
  }

  const messages = cleanMessages(body.messages);
  if (!messages) return new Response("Invalid messages.", { status: 400 });
  if (messages.some((message) => containsSensitiveData(message.content))) {
    return new Response(SENSITIVE_CONTENT_MESSAGE, { status: 422 });
  }

  const controller = new AbortController();
  const upstream = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-Title": "Epiphany Services",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 600,
      stream: true,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    }),
    signal: controller.signal,
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error("OpenRouter error:", upstream.status, detail);
    return new Response("Unable to reach chat service.", {
      status: upstream.status === 429 ? 429 : 502,
    });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();

  const readable = new ReadableStream({
    async start(streamController) {
      let buffer = "";
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const rawLine of lines) {
            const line = rawLine.trim();
            if (!line.startsWith("data:")) continue;
            const payload = line.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;

            try {
              const json = JSON.parse(payload) as {
                choices?: Array<{ delta?: { content?: string } }>;
              };
              const text = json.choices?.[0]?.delta?.content;
              if (text) streamController.enqueue(encoder.encode(text));
            } catch {
              // Ignore malformed/partial SSE comment or keepalive frames.
            }
          }
        }
        streamController.close();
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Chat stream error:", err);
          streamController.error(err);
        }
      }
    },
    cancel() {
      controller.abort();
      reader.cancel().catch(() => {});
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
