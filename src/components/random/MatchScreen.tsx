"use client";

import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

import ChatWindow from "./ChatWindow";

import socket from "@/lib/socket";

export default function MatchScreen() {
  const { roomId, commonInterests } = useSelector(
    (state: RootState) => state.chat,
  );

  // const leaveChat = () => {
  //   socket.emit("leaveRandom", roomId);
  // };

  // =========================
  // SKIP
  // =========================
  const skipChat = () => {
    socket.emit("skipPartner", roomId);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* HEADER */}
      <div className="border-b border-slate-800 bg-slate-900 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Stranger Connected</h1>

            {/* COMMON INTERESTS */}
            {commonInterests.length > 0 && (
              <div className="mt-3">
                <p className="text-sm text-slate-400 mb-2">You both like:</p>

                <div className="flex flex-wrap gap-2">
                  {commonInterests.map((interest) => (
                    <div
                      key={interest}
                      className="bg-blue-600/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-sm"
                    >
                      #{interest}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RANDOM MATCH */}
            {commonInterests.length === 0 && (
              <p className="text-sm text-slate-500 mt-2">Random Match</p>
            )}
          </div>

          {/* <button
            onClick={leaveChat}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl"
          >
            Leave Chat
          </button> */}
          <button
            onClick={skipChat}
            className="bg-red-600 hover:bg-red-700 transition-all px-5 py-3 rounded-2xl font-medium"
          >
            Skip
          </button>
        </div>
      </div>

      {/* CHAT */}
      <ChatWindow />
    </div>
  );
}
