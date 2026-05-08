"use client";

import { useEffect } from "react";

import socket from "@/lib/socket";

import { useDispatch } from "react-redux";

import {
  addMessage,
  setMatched,
  setOnlineUsers,
  resetChat,
} from "@/redux/features/chat/chatSlice";

export const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    // ======================
    // ONLINE USERS
    // ======================
    socket.on(
      "onlineUsers",
      (users) => {
        dispatch(
          setOnlineUsers(users)
        );
      }
    );

    // ======================
    // MATCHED
    // ======================
    socket.on(
      "matched",
      (data) => {
        dispatch(setMatched(data));
      }
    );

    // ======================
    // MESSAGE
    // ======================
    socket.on(
      "randomMessage",
      (message) => {
        dispatch(
          addMessage(message)
        );
      }
    );

    // ======================
    // PARTNER LEFT
    // ======================
    socket.on(
      "partnerLeft",
      () => {
        dispatch(resetChat());
      }
    );

    return () => {
      socket.off("onlineUsers");

      socket.off("matched");

      socket.off("randomMessage");

      socket.off("partnerLeft");
    };
  }, [dispatch]);
};
