"use client";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import socket from "@/lib/socket";

import {
  setUsername,
  setInterests,
  setSearching,
} from "@/redux/features/chat/chatSlice";

import { useSocket } from "@/hooks/useSocket";

import QueueScreen from "@/components/random/QueueScreen";

import MatchScreen from "@/components/random/MatchScreen";

import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

export default function HomePage() {
  useSocket();

  const dispatch = useDispatch();

  const { roomId, isSearching } = useSelector((state: RootState) => state.chat);

  const [name, setName] = useState("");

  const [interestInput, setInterestInput] = useState("");

  const [interests, setLocalInterests] = useState<string[]>([]);

  // =========================
  // ADD INTEREST
  // =========================
  const addInterest = () => {
    if (!interestInput.trim()) return;

    setLocalInterests((prev) => [...prev, interestInput.trim()]);

    setInterestInput("");
  };

  // =========================
  // FIND PARTNER
  // =========================
  const findPartner = () => {
    if (!name.trim()) {
      alert("Enter username");
      return;
    }

    dispatch(setUsername(name));

    dispatch(setInterests(interests));

    socket.emit("join", {
      username: name,
      interests,
    });

    dispatch(setSearching(true));

    socket.emit("findPartner");
  };

  // =========================
  // MATCHED SCREEN
  // =========================
  if (roomId) {
    return <MatchScreen />;
  }

  // =========================
  // SEARCHING SCREEN
  // =========================
  if (isSearching) {
    return <QueueScreen />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-2">Random Chat</h1>

        <p className="text-slate-400 text-center mb-8">
          Talk with strangers based on shared interests
        </p>

        {/* Username */}
        <div className="mb-5">
          <label className="block mb-2 text-sm text-slate-300">Username</label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter username"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Interests */}
        <div className="mb-5">
          <label className="block mb-2 text-sm text-slate-300">Interests</label>

          <div className="flex gap-2">
            <input
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              placeholder="anime"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />

            <button
              onClick={addInterest}
              className="bg-blue-600 hover:bg-blue-700 px-5 rounded-xl"
            >
              Add
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {interests.map((item) => (
              <div
                key={item}
                className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-sm"
              >
                #{item}
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={findPartner}
          className="w-full bg-green-600 hover:bg-green-700 transition-all py-4 rounded-xl font-semibold text-lg"
        >
          Find Partner
        </button>
      </div>
    </main>
  );
}
