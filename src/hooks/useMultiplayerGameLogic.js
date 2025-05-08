import {useEffect, useState, useRef} from 'react'
import {io} from 'socket.io-client'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL

export function useMultiplayerGameLogic(playerName)
{
    const token = useSelector(s => s.auth.token)
    const {roomId} = useParams()
    const location = useLocation()
    const opponent = location.state?.opponent || 'opponent'
    const socketRef = useRef(null)

    const [song, setSong] = useState(null)
    const [guessRegult, setGuessResult] = useState(null)
    const [gameOverData, setGameOverData] = useState(null)

    useEffect(() =>
    {
        const socket = io(SOCKET_URL, {
            withCredentials: true
        })
        socketRef.current = socket
    
        socket.on('connect', () =>
        {
            socket.emit('start_game', {roomId})
        })

        socket.on('new_song', (song) =>
        {
            setSong(song)
            setGuessResult(null)
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
    }, [roomId, token])

    const makeGuess = guess =>
    {
        socketRef.current.emit('guess', {roomId, guess})
    }

    const playAgain = () =>
    {
        setGameOverData(null)
        socketRef.current.emit('find_match', {name: ''})
    }

    return {opponent, song, guessRegult, gameOverData, makeGuess, playAgain}
}