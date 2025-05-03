import { useDispatch, useSelector } from "react-redux"
import React,{ useEffect, useState, useRef } from "react"
import { useGameLogic } from "../hooks/useGameLogic"
import { useSuggestions } from "../hooks/useSuggestions";

const GameComponent = () =>
{
    const {user} = useSelector(state => state.auth)

    const {song, isLoading, isError, message, 
      guess, setGuess, feedback,
      handleGuess, togglePlayPause, volume, 
      setVolume, isPlaying, 
      setIsPlaying, audioRef} = useGameLogic()
    
    const {suggestions, setSuggestions} = useSuggestions(guess)
    
    const handleSuggestionClick = (suggestion) =>
    {
      setGuess(suggestion)
      handleGuess(suggestion)
      setSuggestions([])
    }

    if(isLoading) return <div>Loading...</div>

    if(isError) return <div>Error: {message}</div>

    if(!song) return <div>no song loaded</div>
    if(!song.previewURL) return <div>no song url loaded</div>
    
    return (
      
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>🎵 Guess the Song!</h2>
    
          <button onClick={togglePlayPause}>
            {isPlaying ? "⏸️ Pause Preview" : "▶️ Play Preview"}
          </button>
    
          <br />
          <audio
            ref={audioRef}
            src={song.previewURL}
            preload="auto"
            onEnded={() => setIsPlaying(false)}
          />
    
          <div style={{ margin: "1rem 0" }}>
            <label>🔊 Volume: {Math.round(volume * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </div>
    
          <div>
            <input
              type="text"
              placeholder="Guess the song title..."
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
            <button onClick={handleGuess}>Submit</button>
          </div>

          
          {suggestions.length > 0 && (
  <ul style={{
    listStyle: 'none',
    padding: '0',
    marginTop: '0.5rem',
    background: '#fff',
    position: 'absolute',
    left: '0',
    right: '0',
    zIndex: '10',
    maxHeight: '200px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    borderRadius: '8px'
  }}>
    {suggestions.map((song, i) => (
      <li
        key={song.trackId}
        onClick={() => handleSuggestionClick(song.title)}
        style={{
          cursor: 'pointer',
          padding: '0.5rem',
          borderBottom: '1px solid #eee',
          transition: 'background 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = '#f5f5f5'}
        onMouseOut={(e) => e.currentTarget.style.background = 'white'}
      >
        <strong>{song.title}</strong> <br />
        <small>{song.artistName} — {song.album}</small>
      </li>
    ))}
  </ul>
)}
          {feedback && <p>{feedback}</p>}
        </div>
      )
    }

export default GameComponent