"use client";

import { useEffect } from "react";

import socket from "@/lib/socket";

import { useDispatch } from "react-redux";

import {
  setTyping,
  setOnlineCount,
  addMessage,
  setMatched,
  setOnlineUsers,
  resetChat,
  setSearching,
} from "@/redux/features/chat/chatSlice";

export const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // =====================
    // CONNECT
    // =====================
    if (!socket.connected) {
      socket.connect();
    }

    // =====================
    // SEARCHING
    // =====================
    socket.on("searching", () => {
      dispatch(setSearching(true));
    });

    // =====================
    // ONLINE USERS
    // =====================
    socket.on("onlineUsers", (users) => {
      // dispatch(setOnlineUsers(users));
      dispatch(setOnlineUsers(users));

      dispatch(setOnlineCount(Object.keys(users).length));
    });

    // =====================
    // MATCHED
    // =====================
    socket.on("matched", (data) => {
      dispatch(setMatched(data));
    });

    // =====================
    // MESSAGE
    // =====================
    socket.on("randomMessage", (message) => {
      dispatch(addMessage(message));
    });

    // =====================
    // PARTNER SKIPPED
    // =====================
    socket.on("partnerSkipped", () => {
      dispatch(resetChat());

      dispatch(setSearching(true));
    });

    // =====================
    // TYPING
    // =====================
    socket.on("typing", () => {
      dispatch(setTyping(true));
    });

    socket.on("stopTyping", () => {
      dispatch(setTyping(false));
    });

    socket.on("partnerDisconnected", () => {
      dispatch(resetChat());

      dispatch(setSearching(true));
    });

    return () => {
      socket.off("typing");

      socket.off("stopTyping");
      socket.off("searching");

      socket.off("onlineUsers");

      socket.off("matched");

      socket.off("randomMessage");

      socket.off("partnerSkipped");
      socket.off("partnerDisconnected");
    };
  }, [dispatch]);
};
