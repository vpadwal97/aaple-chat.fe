"use client";

import { useEffect } from "react";

import socket from "@/lib/socket";

import { useDispatch } from "react-redux";

import {
  addMessage,
  setMatched,
  setOnlineUsers,
  resetChat,
  setSearching,
} from "@/redux/features/chat/chatSlice";

export const useSocket = () => {
  const dispatch =
    useDispatch();

  useEffect(() => {
    // =====================
    // CONNECT
    // =====================
    if (
      !socket.connected
    ) {
      socket.connect();
    }

    // =====================
    // SEARCHING
    // =====================
    socket.on(
      "searching",
      () => {
        dispatch(
          setSearching(
            true
          )
        );
      }
    );

    // =====================
    // ONLINE USERS
    // =====================
    socket.on(
      "onlineUsers",
      (users) => {
        dispatch(
          setOnlineUsers(
            users
          )
        );
      }
    );

    // =====================
    // MATCHED
    // =====================
    socket.on(
      "matched",
      (data) => {
        dispatch(
          setMatched(
            data
          )
        );
      }
    );

    // =====================
    // MESSAGE
    // =====================
    socket.on(
      "randomMessage",
      (message) => {
        dispatch(
          addMessage(
            message
          )
        );
      }
    );

    // =====================
    // PARTNER SKIPPED
    // =====================
    socket.on(
      "partnerSkipped",
      () => {
        dispatch(
          resetChat()
        );

        dispatch(
          setSearching(
            true
          )
        );
      }
    );

    return () => {
      socket.off(
        "searching"
      );

      socket.off(
        "onlineUsers"
      );

      socket.off(
        "matched"
      );

      socket.off(
        "randomMessage"
      );

      socket.off(
        "partnerSkipped"
      );
    };
  }, [dispatch]);
};
