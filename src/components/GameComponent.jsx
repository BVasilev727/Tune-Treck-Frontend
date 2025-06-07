import {  useSelector } from "react-redux"
import React from "react"
import { useGameLogic } from "../hooks/useGameLogic"
import { useSuggestions } from "../hooks/useSuggestions";
import Spinner from "./Spinner";

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

    if(isLoading) return <div><Spinner/></div>

    if(isError) return <div className="">Error: {message}</div>

    if(!song) return <div>no song loaded</div>
    if(!song.previewURL) return <div>no song url loaded</div>
    
    return (
    <div className="bg-bg text-text min-h-screen">
      
      <main className="pt-24 pb-12 px-4 flex flex-col items-center">
         <div className="w-full max-w-md bg-surface border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Guess the Song!</h2>
    <div className="flex items-center mb-4">
          <button onClick={togglePlayPause} className="text-primary mr-4 hover:text-primary-variant transition">
            {isPlaying ? "⏸️ Pause Preview" : "▶️ Play Preview"}
          </button>
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
    </div> 
          <div className="relative flex">
            <input
              type="text"
              placeholder="Guess the song title..."
              className="
                w-full border border-border rounded-full
                px-4 py-2 pr-12 bg-bg text-text
                focus:outline-none focus:ring-2 focus:ring-primary
                transition"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
            <button onClick={handleGuess}className="
                absolute right-3 top-1/2 -translate-y-1/2
                text-primary hover:text-primary-variant
                transition">➤</button>
                
{suggestions.length > 0 && (
          <ul  className="
                            absolute left-0 top-full
+     w-full
+     bg-surface border border-border
+     rounded-b-lg overflow-auto z-10
                          "
                          style={{ maxHeight: '12rem' }}
                        >
              {suggestions.map((song, i) => (
                <li
                  key={song.trackId}
                  onClick={() => handleSuggestionClick(song.title)}
                  className="
                                flex items-center px-4 py-2
                                hover:bg-surface/50 cursor-pointer
                                transition
                              "
                  onMouseOver={(e) => e.currentTarget.style.background = '#f5f5f5'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                >
                  <div>
                                <div className="font-semibold text-text">{song.title}</div>
                                <div className="text-text-alt text-sm">{song.artist}</div>
                              </div>
                </li>
              ))}    
            </ul>)}

          </div>
          </div>
          {feedback === 'correct' && (
    <div className="w-full max-w-md bg-surface border border-border rounded-lg p-6 mt-6">
      <p className="text-center text-primary font-semibold">
        ✅ Correct!
      </p>
    </div>
  )}

  {feedback === 'wrong' && (
    <div className="w-full max-w-md bg-surface border border-border rounded-lg p-6 mt-6">
      <p className="text-center text-danger font-semibold">
        ❌ Wrong—try again!
      </p>
    </div>
  )}
      </main>    
    </div>
      )
    }

export default GameComponent