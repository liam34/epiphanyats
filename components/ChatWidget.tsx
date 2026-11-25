"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  containsSensitiveData,
  SENSITIVE_CONTENT_MESSAGE,
} from "@/lib/chat-safety";
import {
  safeOpenRouterRequest,
  type ChatMessage,
} from "@/lib/safe-openrouter-request";
import styles from "./ChatWidget.module.css";

type Message = ChatMessage;
type ContactDetails = { email: string; phone: string; phoneHref: string };

const GREETING =
  "Hi, I can answer questions about our accounting, tax, and consulting services. For advice on your own situation, we will connect you with the team. Please do not share sensitive personal, financial, or tax document details here.";

const STARTER_QUESTIONS = [
  "What services do you offer?",
  "How do I book a consultation?",
  "What documents do I need to bring?",
];

function renderInlineText(text: string) {
  const tokenPattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\(\/[a-z0-9/-]*\)|\/contact\b)/gi;
  const parts = text.split(tokenPattern);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    const mdLink = part.match(/^\[([^\]]+)\]\((\/[a-z0-9/-]*)\)$/i);
    if (mdLink) {
      return (
        <Link key={index} href={mdLink[2]} className={styles.inlineLink}>
          {mdLink[1]}
        </Link>
      );
    }
    if (part.toLowerCase() === "/contact") {
      return (
        <Link key={index} href="/contact" className={styles.inlineLink}>
          Contact page
        </Link>
      );
    }
    return part;
  });
}

function renderAssistantContent(content: string) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (keyPrefix: string) => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={`${keyPrefix}-list`} className={styles.bulletList}>
        {listItems.map((item, idx) => (
          <li key={idx}>{renderInlineText(item)}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  lines.forEach((rawLine, index) => {
    const bulletMatch = rawLine.match(/^\s*(?:[-*•])\s+(.*)$/);
    if (bulletMatch) {
      listItems.push(bulletMatch[1]);
      return;
    }
    flushList(`line-${index}`);
    const trimmed = rawLine.trim();
    if (trimmed) {
      blocks.push(
        <p key={`p-${index}`} className={styles.paragraph}>
          {renderInlineText(trimmed)}
        </p>
      );
    }
  });

  flushList("end");
  return blocks;
}

export default function ChatWidget({
  contactDetails,
}: {
  contactDetails: ContactDetails;
}) {
  const [open, setOpen] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Keep the newest message in view.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, open]);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Cancel any in-flight request on unmount.
  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    if (containsSensitiveData(content)) {
      setError(SENSITIVE_CONTENT_MESSAGE);
      return;
    }

    setError(null);
    setInput("");
    const history: Message[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await safeOpenRouterRequest({
        messages: history,
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const errorMessage =
          res.status === 429
            ? "You're sending messages quickly. Wait a minute and try again."
            : res.status === 422
              ? SENSITIVE_CONTENT_MESSAGE
              : "Something went wrong. Please try again.";
        throw new Error(errorMessage);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: reply }]);
      }
      if (!reply.trim()) throw new Error("No reply received. Please try again.");
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      // Drop the empty assistant bubble and show the error.
      setMessages(history);
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  function onPanelKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") setOpen(false);
  }

  return (
    <div className={styles.root}>
      {open && (
        <div
          className={styles.panel}
          role="dialog"
          aria-label="Chat with us"
          onKeyDown={onPanelKeyDown}
        >
          <header className={styles.header}>
            <span className={styles.title}>Ask us anything</span>
            <button
              type="button"
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div
            className={styles.messages}
            ref={listRef}
            role="log"
            aria-live="polite"
          >
            <div className={`${styles.bubble} ${styles.assistant}`}>
              {GREETING}
              <span className={styles.contactLinks}>
                Contact us:{" "}
                <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
                {" · "}
                <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
              </span>
            </div>

            {messages.length === 0 && (
              <div className={styles.starters}>
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    className={styles.starter}
                    onClick={() => send(q)}
                    disabled={loading}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`${styles.bubble} ${
                  m.role === "user" ? styles.user : styles.assistant
                }`}
              >
                {m.content
                  ? m.role === "assistant"
                    ? renderAssistantContent(m.content)
                    : m.content
                  : loading && i === messages.length - 1 ? (
                    <span className={styles.typing} aria-label="Typing">
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : null}
              </div>
            ))}

            {error && (
              <div className={styles.error} role="alert">
                {error}
              </div>
            )}
          </div>

          <form
            className={styles.composer}
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <div className={styles.composerControls}>
              <textarea
                ref={inputRef}
                className={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type your question"
                aria-label="Your message"
                rows={1}
                maxLength={2000}
              />
              <button
                type="submit"
                className={styles.send}
                disabled={loading || !input.trim()}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}

      {!open && welcomeVisible && (
        <div className={styles.welcome} role="status">
          <button
            type="button"
            className={styles.welcomeClose}
            onClick={() => setWelcomeVisible(false)}
            aria-label="Dismiss welcome message"
          >
            ×
          </button>
          <strong className={styles.welcomeTitle}>
            Hi there! Welcome to Epiphany Accounting &amp; Tax Services.
          </strong>
          <span className={styles.welcomeMessage}>
            Have a question? Ask us about accounting, tax, or consulting.
          </span>
        </div>
      )}

      <button
        type="button"
        className={styles.launcher}
        onClick={() => {
          setWelcomeVisible(false);
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? "×" : "Chat"}
      </button>
    </div>
  );
}
