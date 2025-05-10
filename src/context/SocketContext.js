import React, {createContext, useContext, useEffect, useRef} from "react";
import { io } from "socket.io-client"
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const SocketContext = createContext(null)

export const SocketProvider = () =>
{
    const {checkedAuth} = useSelector(state => state.auth)
    const token = useSelector(state => state.auth.user.token)
    const socketRef = useRef(null)

    useEffect(()=>
    {
        if(!checkedAuth || socketRef.current) return
        
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

    if(!socketRef.current)
    {
        return null
    }

    return (
        <SocketContext.Provider value={socketRef.current}>
           <Outlet />
        </SocketContext.Provider>
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