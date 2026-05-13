"use client";

import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

export default function QueueScreen() {
  const { onlineCount } =
    useSelector(
      (
        state: RootState
      ) => state.chat
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>

          <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-3">
          Looking for someone...
        </h1>

        <p className="text-slate-400 mb-6">
          Matching based on shared
          interests
        </p>

        {/* Online Count */}
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-5 py-3 rounded-full">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>

          <span className="text-sm">
            {onlineCount} online
          </span>
        </div>
      </div>
    </div>
  );
}