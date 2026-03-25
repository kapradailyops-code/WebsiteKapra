"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! I'm Akira 👋 Ask me anything about our services, process, or how we can help launch your next product.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", text: `Error: ${data.error ?? res.statusText}` }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", text: data.reply ?? "No response received." }]);
      }
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", text: `Network error — ${String(e)}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed inset-x-3 bottom-24 z-[9999] flex flex-col items-end gap-3 sm:inset-x-auto sm:bottom-6 sm:right-6">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[540px] w-full max-w-[380px] self-stretch flex-col overflow-hidden rounded-[1.75rem] border border-foreground/10 backdrop-blur-2xl sm:self-auto"
            style={{
              maxHeight: "calc(100dvh - 7rem - env(safe-area-inset-bottom))",
              background: "rgba(10,10,10,0.92)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(229,168,75,0.08)",
            }}
          >
            {/* Decorative gold top edge */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

            {/* Header */}
            <div
              className="flex items-center gap-3 border-b border-foreground/8 px-5 py-4"
              style={{ background: "rgba(20,18,14,0.6)" }}
            >
              {/* Gold avatar */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-yellow-600 shadow-[0_0_16px_rgba(229,168,75,0.45)]">
                <Bot className="h-4 w-4 text-black" />
              </div>
              <div>
                <p className="font-display text-base font-semibold text-foreground">Akira</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-amber-400/60">AI Assistant</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.05] text-foreground/50 transition hover:border-amber-400/30 hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Messages */}
            <div
              data-lenis-prevent="true"
              className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                      msg.role === "user"
                        ? "rounded-br-sm text-foreground ring-1 ring-inset ring-amber-400/30"
                        : "rounded-bl-sm bg-foreground/[0.06] text-foreground/85 ring-1 ring-inset ring-foreground/8"
                    }`}
                    style={
                      msg.role === "user"
                        ? { background: "rgba(229,168,75,0.12)" }
                        : undefined
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-foreground/[0.06] px-4 py-3 ring-1 ring-inset ring-foreground/8">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-400/60 [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-400/60 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-400/60 [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-foreground/8 bg-foreground/[0.02] p-3">
              <div className="flex items-end gap-2 rounded-2xl border border-foreground/10 bg-foreground/[0.05] px-4 py-2.5 focus-within:border-amber-400/30 transition-colors">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about our services…"
                  className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-foreground/30 outline-none"
                  style={{ maxHeight: "100px" }}
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || loading}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-yellow-600 text-black shadow-[0_0_12px_rgba(229,168,75,0.4)] transition hover:shadow-[0_0_20px_rgba(229,168,75,0.6)] disabled:opacity-30 disabled:shadow-none"
                >
                  {loading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <p className="mt-1.5 text-center font-mono text-[0.58rem] uppercase tracking-[0.22em] text-foreground/25">
                Akira · Press Enter to send
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button — gold foil */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-yellow-600 shadow-[0_0_24px_rgba(229,168,75,0.5)] transition-shadow hover:shadow-[0_0_40px_rgba(229,168,75,0.7)]"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="h-5 w-5 text-black" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="h-5 w-5 text-black" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
