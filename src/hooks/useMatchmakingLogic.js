import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useSocket } from "../context/SocketContext"

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL

export function useMatchmakingLogic(){
    const user = useSelector(state => state.auth.user)
    const socketRef = useSocket()

    const [queueTime, setQueueTime] = useState(0)
    const [matched, setMatched] = useState(false)
    const [roomId, setRoomId] = useState(null)
    const [opponent, setOpponent] = useState(null)
    const [queueStart, setQueueStart] = useState(null)

    useEffect(() => {
      
        console.log('🔌 Initializing Socket.IO client…')
      
        if(!token)
        {
          console.log('waiting for token')
          return
        }
        
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
      }, [user.name, token])

    useEffect(() =>
    {
      return () => {
        socketRef.current?.disconnect();
      }
    }, [])
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