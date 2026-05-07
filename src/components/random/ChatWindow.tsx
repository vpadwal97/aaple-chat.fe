"use client";

import { useState } from "react";

import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

import socket from "@/lib/socket";

export default function ChatWindow() {
  const [message, setMessage] = useState("");

  const { messages, roomId, username } = useSelector(
    (state: RootState) => state.chat
  );

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("randomMessage", {
      roomId,
      message,
    });

    setMessage("");
  };

  return (
    <div className="flex-1 flex flex-col p-4">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, index) => {
          const isMe = msg.user === username;

          return (
            <div
              key={index}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-md px-4 py-3 rounded-2xl ${
                  isMe ? "bg-blue-600" : "bg-slate-800"
                }`}
              >
                <p className="text-sm text-slate-300 mb-1">{msg.user}</p>

                <p>{msg.message}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Type message..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}
