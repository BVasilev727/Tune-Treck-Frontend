import {useEffect, useRef, useState} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL

export function useMultiplayerGameLogic(playerName)
{
    const token = useSelector(s => s.auth.user.token)
    const {roomId} = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const opponent = location.state?.opponent || 'opponent'
    const socketRef = useRef(null)

    const [song, setSong] = useState(null)
    const [guessRegult, setGuessResult] = useState(null)
    const [gameOverData, setGameOverData] = useState(null)

    
    useEffect(() =>
    {   
        if(!roomId) return
    const socket = io(SOCKET_URL, {
      path: '/socket.io',
      withCredentials: true,
      transports: ['polling','websocket']
    })
        socketRef.current = socket

        socket.on('connect', () =>
        {
            socket.emit('join_room', {roomId})
        })

        socket.on('new_song', (song) =>
        {
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
            socket.disconnect()
        }
    }, [socketRef, roomId])

    const makeGuess = guess =>
    {
        socketRef.current.emit('guess', {roomId, guess})
    }

    const playAgain = () =>
    {
        navigate('/multiplayer')
    }


    return {opponent, song, guessRegult, gameOverData, makeGuess, playAgain}
}