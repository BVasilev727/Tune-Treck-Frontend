import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {reset, fetchNewSong} from '../features/songs/songSlice'

export const useGameLogic = () =>
{
    const dispatch = useDispatch()
    const {song, isLoading, isError, message} = useSelector(state => state.song)

    const [guess, setGuess] = useState("");
    const [feedback, setFeedback] = useState("")
    const [volume, setVolume] = useState(0.5)
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef(null)
    
    useEffect(() =>
    {
        if(isError)
        {
            console.error(message)
        }
        dispatch(fetchNewSong())
        return () => dispatch(reset)
    },[dispatch, isError, message]);

    useEffect(() =>
    {
        if(audioRef.current)
        {
            audioRef.current.volume = volume
        }
    },[volume])

    const togglePlayPause = () =>
    {
        if(!audioRef.current) return
        if(isPlaying)
        {
            audioRef.current.pause()
        }
        else{
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleGuess = () =>
    {
        if(!song) return
        const correct = song.title.toLowerCase().trim() === guess.toLowerCase().trim()
        setFeedback(correct ? "correct" : "try again")
    }

    return {song, isLoading, isError, message, guess, setGuess, feedback,
    handleGuess, togglePlayPause, volume, setVolume, isPlaying, setIsPlaying, audioRef}
}

