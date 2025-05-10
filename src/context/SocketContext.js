import React, {createContext, useContext, useEffect, useRef} from "react";
import { io } from "socket.io-client"
import { useSelector } from "react-redux";

const SocketContext = createContext(null)

export const SocketProvider = ({children}) =>
{
    const token = useSelector(state => state.auth.user.token)
    const socketRef = useRef(null)

    useEffect(()=>
    {
        if(!token) return
        if(socketRef.current) return

        const socket = io(process.env.REACT_APP_SOCKET_URL,
            {
                path: '/socket.io',
                auth: {token},
                transports: ['polling', 'websocket']
            }
        )

        socketRef.current = socket

        return () =>
        {
            socket.disconnect()
            socketRef.current = null
        }
    }, [token])

    return (
        <SocketContext.SocketProvider value={socketRef.current}>
            {children}
        </SocketContext.SocketProvider>
    )
}

export const useSocket = () =>
{
    const socket = useContext(SocketContext)

    if(!socket){
        throw new Error('use socket must be inside a socket provider')
    }
    return socket
}