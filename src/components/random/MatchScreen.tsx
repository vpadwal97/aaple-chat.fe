"use client";

import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

import ChatWindow from "./ChatWindow";

import socket from "@/lib/socket";

export default function MatchScreen() {
  const {
    roomId,
    commonInterests,
  } = useSelector(
    (state: RootState) => state.chat
  );

  const leaveChat = () => {
    socket.emit(
      "leaveRandom",
      roomId
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-800 p-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">
            Connected
          </h1>

          <div className="flex gap-2 mt-2">
            {commonInterests.map(
              (interest) => (
                <span
                  key={interest}
                  className="bg-slate-800 px-3 py-1 rounded-full text-sm"
                >
                  #{interest}
                </span>
              )
            )}
          </div>
        </div>

        <button
          onClick={leaveChat}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl"
        >
          Skip
        </button>
      </div>

      {/* Chat */}
      <ChatWindow />
    </div>
  );
}
