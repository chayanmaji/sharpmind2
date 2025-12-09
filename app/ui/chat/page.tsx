"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const { messages, sendMessage, status, error, stop } = useChat();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput("");
  };

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {error && <div className="text-red-500 mb-4">{error.message}</div>}
      {status === "submitted" && !messages && <div>Loading...</div>}
      {messages.map((message, index) => (
        <div
          key={message.id}
          className="mb-4"
          ref={index === messages.length - 1 ? lastMessageRef : null}
        >
          <div
            className={`font-semibold self-end`}
            style={{
              display: "flex",
              justifyContent:
                message.role.trim() === "assistant" ? "flex-start" : "flex-end",
            }}
          >
            {message.role.trim() === "assistant" ? "Sharpmind" : "You"}
          </div>
          {message.parts.map((part, index) => {
            switch (part.type) {
              case "text":
                return (
                  <div
                    key={`${message.id}-${index}`}
                    className="whitespace-pre-wrap"
                    style={{
                      display: "flex",
                      justifyContent:
                        message.role.trim() === "assistant"
                          ? "flex-start"
                          : "flex-end",
                    }}
                  >
                    {part.text}
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      ))}
      {(status === "submitted" || status === "streaming") && (
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <TypingIndicator />
          </div>
        </div>
      )}
      <ChatInput
        handleSubmit={handleSubmit}
        input={input}
        setInput={setInput}
        status={status}
      />
    </div>
  );
}
