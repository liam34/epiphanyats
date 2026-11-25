import {
  containsSensitiveData,
  SENSITIVE_CONTENT_MESSAGE,
} from "./chat-safety";

export type ChatMessage = { role: "user" | "assistant"; content: string };

export async function safeOpenRouterRequest({
  messages,
  signal,
}: {
  messages: ChatMessage[];
  signal: AbortSignal;
}) {
  if (messages.some((message) => containsSensitiveData(message.content))) {
    throw new Error(SENSITIVE_CONTENT_MESSAGE);
  }

  return fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
    signal,
  });
}
