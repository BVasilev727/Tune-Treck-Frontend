import {useEffect, useState, useRef} from 'react'
import {io} from 'socket.io-client'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL

export function useMultiplayerGameLogic()
{
    const token = useSelector(s => s.auth.user.token)
    const {roomId} = useParams()
    const location = useLocation()
    const opponent = location.state?.opponent || 'opponent'
    const socketRef = useRef(null)

    const [song, setSong] = useState(null)
    const [guessResult, setGuessResult] = useState(null)
    const [gameOverData, setGameOverData] = useState(null)

    
    useEffect(() =>
    {
        if(!roomId || !token) 
        {
            console.log('no room id or no token recieved')
            return
        }
        if(socketRef.current) return

        const socket = io(SOCKET_URL,{
            auth: {token},
            withCredentials: true,
            path: 'socket.io'
        })
        socketRef.current = socket
        
        socket.on('connect', () =>
        {
            socket.emit('join_room', {roomId})
            console.log("connected to room", roomId)
            socket.emit('start_game', {roomId})
        })
        socket.onAny((evn, ...args) => console.debug('socket.onAny:', evn, args))
        socket.on('new_song', song =>
        {
            console.log('song:',song)
            setSong(song)
            setGuessResult(null)
            setGameOverData(null)
        })

        socket.on('guess_result', ({correct}) =>
        {
            setGuessResult(correct)
        })

        socket.on('game_over', (data) =>
        {
            setGameOverData(data)
            setSong(null)
        })

        return () =>
        {
            socketRef.current.disconnect()
        }
    }, [roomId, token, socketRef])

    const makeGuess = guess =>
    {
        socketRef.current.emit('guess', {roomId, guess})
    }

    const playAgain = () =>
    {
        setGameOverData(null)
        socketRef.current.emit('find_match', {name: ''})
    }

    return {opponent, song, guessResult, gameOverData, makeGuess, playAgain}
}