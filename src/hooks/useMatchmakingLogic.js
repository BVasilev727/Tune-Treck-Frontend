import { useEffect, useState, useRef } from "react"
import { io } from "socket.io-client"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL

export function useMatchmakingLogic(){
    const user = useSelector(state => state.auth.user)
    const socketRef = useRef(null)
    const token = useSelector(state => state.auth.user.token)
    const navigate = useNavigate()

    const [queueTime, setQueueTime] = useState(0)
    const [matched, setMatched] = useState(false)
    const [roomId, setRoomId] = useState(null)
    const [opponent, setOpponent] = useState(null)
    const [queueStart, setQueueStart] = useState(null)

    useEffect(() => {
      
        console.log('🔌 Initializing Socket.IO client…')
        if(!user?.name) navigate('/')
        if(!token)
        {
          console.log('waiting for token')
          return
        }
        const socket = io(SOCKET_URL,{
          auth: {token},
          withCredentials: true,
          transports: ['polling','websocket'],
          path: '/socket.io'
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
          navigate(`/multiplayer/${roomId}`,
            {
              state:{opponent:players.find(n=> n!== user.name)}
            }
          )
        })

        return () =>
        {
          socket.disconnect()
        }
      }, [user, token, navigate])

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