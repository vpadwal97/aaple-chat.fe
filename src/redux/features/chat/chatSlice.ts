import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  Message,
  MatchData,
} from "@/types/chat";

interface ChatState {
  username: string;

  interests: string[];

  onlineUsers: any[];

  roomId: string | null;

  matchedUsers: string[];

  commonInterests: string[];

  messages: Message[];

  isSearching: boolean;

  connected: boolean;
}

const initialState: ChatState = {
  username: "",

  interests: [],

  onlineUsers: [],

  roomId: null,

  matchedUsers: [],

  commonInterests: [],

  messages: [],

  isSearching: false,

  connected: false,
};

const chatSlice = createSlice({
  name: "chat",

  initialState,

  reducers: {
    setUsername: (
      state,
      action: PayloadAction<string>
    ) => {
      state.username = action.payload;
    },

    setInterests: (
      state,
      action: PayloadAction<string[]>
    ) => {
      state.interests = action.payload;
    },

    setOnlineUsers: (
      state,
      action
    ) => {
      state.onlineUsers = action.payload;
    },

    setSearching: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isSearching = action.payload;
    },

    setMatched: (
      state,
      action: PayloadAction<MatchData>
    ) => {
      state.roomId = action.payload.roomId;

      state.matchedUsers =
        action.payload.users;

      state.commonInterests =
        action.payload.commonInterests;

      state.isSearching = false;

      state.messages = [];
    },

    addMessage: (
      state,
      action: PayloadAction<Message>
    ) => {
      state.messages.push(
        action.payload
      );
    },

    resetChat: (state) => {
      state.roomId = null;

      state.messages = [];

      state.matchedUsers = [];

      state.commonInterests = [];

      state.isSearching = false;
    },
  },
});

export const {
  setUsername,
  setInterests,
  setOnlineUsers,
  setSearching,
  setMatched,
  addMessage,
  resetChat,
} = chatSlice.actions;

export default chatSlice.reducer;
