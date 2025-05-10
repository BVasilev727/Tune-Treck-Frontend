import {useEffect, useState} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useSocket } from '../context/SocketContext'

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL

export function useMultiplayerGameLogic(playerName)
{
    const token = useSelector(s => s.auth.user.token)
    const {roomId} = useParams()
    const location = useLocation()
    const opponent = location.state?.opponent || 'opponent'
    const socket = useSocket()

    const [song, setSong] = useState(null)
    const [guessRegult, setGuessResult] = useState(null)
    const [gameOverData, setGameOverData] = useState(null)

    
    useEffect(() =>
    {    
        socket.on('new_song', (song) =>
        {
            console.log('song:',song)
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
    }, [socket, roomId])

    const makeGuess = guess =>
    {
        socket.emit('guess', {roomId, guess})
    }

    const playAgain = () =>
    {
        setGameOverData(null)
        socket.emit('find_match', {name: ''})
    }

    return {opponent, song, guessRegult, gameOverData, makeGuess, playAgain}
}