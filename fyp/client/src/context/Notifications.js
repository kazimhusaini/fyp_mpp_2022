import { createContext, useEffect, useReducer, useRef } from "react";
import { io } from "socket.io-client";
const socket = io();

import Reducer from "./Reducer";

const INITIAL_STATE = {
  socket: socket,
};

export const notiContext = createContext(INITIAL_STATE);

export const NotiContextProvider = ({ children }) => {
  const [state, dispatch2] = useReducer(Reducer, INITIAL_STATE);


  return (
    <notiContext.Provider
      value={{
        socket: state.socket,
        dispatch2,
      }}
    >
      {children}
    </notiContext.Provider>
  );
};