"use client";

import { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

import socket from "@/lib/socket";

export default function ChatWindow() {
  const [message, setMessage] = useState("");

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { messages, roomId, username, isTyping } = useSelector(
    (state: RootState) => state.chat,
  );

  // =========================
  // AUTO SCROLL
  // =========================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  // =========================
  // SEND MESSAGE
  // =========================
  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("randomMessage", {
      roomId,
      message,
    });

    socket.emit("stopTyping", roomId);

    setMessage("");
  };

  // =========================
  // HANDLE TYPING
  // =========================
  const handleTyping = (value: string) => {
    setMessage(value);

    socket.emit("typing", roomId);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", roomId);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-110px)]">
      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.user === username ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] md:max-w-md px-4 py-3 rounded-3xl ${
                msg.user === username
                  ? "bg-blue-600"
                  : "bg-slate-800 border border-slate-700"
              }`}
            >
              <p className="text-xs text-slate-300 mb-1">{msg.user}</p>

              <p className="break-words">{msg.message}</p>

              <p className="text-[10px] text-slate-400 mt-2 text-right">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {/* TYPING */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-3xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>

                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>

                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="border-t border-slate-800 p-4 bg-slate-900">
        <div className="flex gap-3">
          <input
            value={message}
            onChange={(e) => handleTyping(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 px-6 rounded-2xl font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
