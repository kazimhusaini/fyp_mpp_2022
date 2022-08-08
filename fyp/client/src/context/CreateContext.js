import React from 'react'
import socketio from 'socket.io-client'

export const socket = socketio('http://localhost:5000/api')
const SocketContext = React.createContext(socket)

export const SocketProvider = SocketContext.Provider
export const SocketConsumer = SocketContext.Consumer
export default SocketContext