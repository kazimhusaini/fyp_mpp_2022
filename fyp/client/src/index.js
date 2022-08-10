import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/Context";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { SocketContext, socket } from "./context/SocketContext";
import { PostContextProvider } from "./context/PostContext";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <ContextProvider>
        <PostContextProvider>
          <SocketContext.Provider value={socket}>
            <App />
          </SocketContext.Provider>
        </PostContextProvider>
      </ContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
