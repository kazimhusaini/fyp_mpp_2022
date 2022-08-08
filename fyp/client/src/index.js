import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ContextProvider } from "./context/Context";
import { NotiContextProvider } from "./context/Notifications";

import { DarkModeContextProvider } from "./context/darkModeContext";
import { SocketContext ,socket} from './context/SocketContext';

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <ContextProvider>
        <NotiContextProvider>
        <SocketContext.Provider value={socket}>
          <App />
          </SocketContext.Provider>
        </NotiContextProvider>
      </ContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


