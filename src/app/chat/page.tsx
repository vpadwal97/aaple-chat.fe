"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

import {
  setUsername,
  setInterests,
  setSearching,
} from "@/redux/features/chat/chatSlice";

import socket from "@/lib/socket";

import { useSocket } from "@/hooks/useSocket";

import QueueScreen from "@/components/random/QueueScreen";

import MatchScreen from "@/components/random/MatchScreen";

// =========================
// MAIN PAGE
// =========================
export default function ChatPage() {
  useSocket();

  const dispatch = useDispatch();

  const router = useRouter();

  const searchParams =
    useSearchParams();

  const {
    roomId,
    isSearching,
  } = useSelector(
    (state: RootState) =>
      state.chat
  );

  // =========================
  // LOCAL STATE
  // =========================
  const [name, setName] =
    useState("");

  const [
    interestInput,
    setInterestInput,
  ] = useState("");

  const [interests, setLocalInterests] =
    useState<string[]>([]);

  // =========================
  // READ URL INTERESTS
  // =========================
  useEffect(() => {
    const params =
      searchParams.get(
        "interests"
      );

    if (!params) return;

    const parsed =
      params
        .split(",")
        .map((i) =>
          i.trim()
        )
        .filter(Boolean);

    setLocalInterests(parsed);
  }, [searchParams]);

  // =========================
  // ADD INTEREST
  // =========================
  const addInterest = () => {
    if (
      !interestInput.trim()
    )
      return;

    const updated = [
      ...interests,
      interestInput.trim(),
    ];

    setLocalInterests(
      updated
    );

    // update URL
    router.push(
      `/chat?interests=${updated.join(
        ","
      )}`
    );

    setInterestInput("");
  };

  // =========================
  // REMOVE INTEREST
  // =========================
  const removeInterest = (
    interest: string
  ) => {
    const updated =
      interests.filter(
        (i) =>
          i !== interest
      );

    setLocalInterests(
      updated
    );

    if (
      updated.length === 0
    ) {
      router.push("/chat");
    } else {
      router.push(
        `/chat?interests=${updated.join(
          ","
        )}`
      );
    }
  };

  // =========================
  // FIND PARTNER
  // =========================
  const findPartner = () => {
    if (!name.trim()) {
      alert(
        "Enter username"
      );

      return;
    }

    dispatch(
      setUsername(name)
    );

    dispatch(
      setInterests(
        interests
      )
    );

    if (
      !socket.connected
    ) {
      socket.connect();
    }

    socket.emit("join", {
      username: name,
      interests,
    });

    dispatch(
      setSearching(true)
    );

    socket.emit(
      "findPartner"
    );
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
    return (
      <QueueScreen />
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        {/* TITLE */}
        <h1 className="text-5xl font-bold text-center mb-3">
          Aaple Chat
        </h1>

        <p className="text-slate-400 text-center mb-10">
          Meet strangers with
          shared interests
        </p>

        {/* USERNAME */}
        <div className="mb-6">
          <label className="block mb-2 text-sm text-slate-400">
            Username
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            placeholder="Enter username"
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* INTERESTS */}
        <div className="mb-6">
          <label className="block mb-2 text-sm text-slate-400">
            Interests
          </label>

          <div className="flex gap-2">
            <input
              value={
                interestInput
              }
              onChange={(e) =>
                setInterestInput(
                  e.target.value
                )
              }
              placeholder="anime"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4 outline-none focus:border-blue-500"
            />

            <button
              onClick={
                addInterest
              }
              className="bg-blue-600 hover:bg-blue-700 px-5 rounded-2xl"
            >
              Add
            </button>
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mt-5">
            {interests.map(
              (interest) => (
                <button
                  key={
                    interest
                  }
                  onClick={() =>
                    removeInterest(
                      interest
                    )
                  }
                  className="bg-slate-800 border border-slate-700 hover:border-red-500 px-4 py-2 rounded-full text-sm transition-all"
                >
                  #
                  {interest}
                  {" ×"}
                </button>
              )
            )}
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={
            findPartner
          }
          className="w-full bg-green-600 hover:bg-green-700 transition-all py-4 rounded-2xl font-semibold text-lg"
        >
          Start Chatting
        </button>
      </div>
    </main>
  );
}
