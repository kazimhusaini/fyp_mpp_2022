import { createContext } from "react";
import { io } from "socket.io-client";

 export const socket = io.connect('http://localhost:5000/api', {     // note changed URL here
  transports: ['websocket'],
});



socket.on("connect", () => {
  console.log(`connect ${socket.id}`);
});

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

socket.on("disconnect", (reason) => {
  console.log(`disconnect due to ${reason}`);
});

export const SocketContext = createContext();


