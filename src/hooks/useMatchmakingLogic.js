import { useEffect, useState, useRef } from "react"
import { io } from "socket.io-client"
import { useSelector } from "react-redux"

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || window.location.origin

export function useMatchmakingLogic(){
    const user = useSelector(state => state.auth)
    const socketRef = useRef(null)

    const [queueTime, setQueueTime] = useState(0)
    const [matched, setMatched] = useState(false)
    const [roomId, setRoomId] = useState(null)
    const [opponent, setOpponent] = useState(null)
    const [queueStart, setQueueStart] = useState(null)

    useEffect(() => {
        console.log('🔌 Initializing Socket.IO client…')
        const socket = io(SOCKET_URL, {
          withCredentials: true
        })
        socketRef.current = socket
    
        socket.on('connect', () => {
          console.log('✅ Socket connected, id =', socket.id)
        })
        socket.on('connect_error', (err) => {
          console.error('❌ Socket connect_error:', err.message)
        })
        socket.on('matched', ({ roomId, players }) => {
          console.log('📨 Received matched:', roomId, players)
          setMatched(true)
          setRoomId(roomId)
          setOpponent(players.find((n) => n !== user.name))
        })
    
        return () => {
          console.log('🛑 Disconnecting socket…')
          socket.disconnect()
        }
      }, [user.name])
      
    useEffect(() =>
    {
        let timer
        if(queueStart && !matched)
        {
            timer=setInterval(() =>
            {
                setQueueTime(Math.floor(Date.now() - queueStart)/1000)
            },1000)
        }
        if(matched) clearInterval(timer)

        return () => clearInterval(timer)
    },[queueStart, matched])

    const findMatch = () =>
    {
        setQueueStart(Date.now())
        setQueueTime(0)
        socketRef.current.emit('find_match', {name: user.name})
    }

    return {findMatch, queueTime, queueStart, matched, roomId, opponent}
}