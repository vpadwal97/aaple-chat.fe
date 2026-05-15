import { io, Socket } from "socket.io-client";

// const SOCKET_URL = "http://localhost:10000";
const SOCKET_URL = "https://chat-backend-c5ve.onrender.com";

let socket: Socket;

declare global {
  interface Window {
    socket?: Socket;
  }
}

if (typeof window !== "undefined") {
  if (!window.socket) {
    window.socket = io(SOCKET_URL, {
      autoConnect: false,
      transports: ["websocket"],
    });
  }

  socket = window.socket;
} else {
  socket = {} as Socket;
}

export default socket;
