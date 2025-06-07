import React, { useState, useRef, useEffect } from "react";
import { useMultiplayerGameLogic } from "../hooks/useMultiplayerGameLogic";
import { useNavigate } from "react-router-dom";
import { useSuggestions } from "../hooks/useSuggestions";

const MultiplayerGame = () => {
  const { opponent, song, guessResult, gameOverData, makeGuess } = useMultiplayerGameLogic();
  const {suggestions, setSuggestions} = useSuggestions(guess)
  const navigate = useNavigate();
  const [guess, setGuess] = useState("");
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  const [isPlaying,setIsPlaying] = useState(false)

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.load();
      audioRef.current.volume = volume;
    }
  }, [song, volume]);
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
    const handleSuggestionClick = (suggestion) =>
    {
      setGuess(suggestion)
      makeGuess(suggestion)
      setSuggestions([])
    }
  const handlePlayAgain = () => {
    navigate("/multiplayer");
  };

  if (gameOverData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] p-4">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 text-center max-w-md w-full shadow-lg">
          <h2 className="text-3xl font-bold mb-4">
            🏆 {gameOverData.winner.name} wins!
          </h2>
          <p className="mb-6">
            New Elo — {gameOverData.winner.name}: {gameOverData.winner.newElo} |{" "}
            {gameOverData.loser.name}: {gameOverData.loser.newElo}
          </p>
          <button
            onClick={handlePlayAgain}
            className="bg-[var(--color-primary)] text-[var(--color-secondary)] px-6 py-2 rounded-full font-semibold hover:bg-[var(--color-primary-variant)] transition"
          >
            Play Again?
          </button>
        </div>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">
            Matched vs A Worthy Opponent
          </h2>
          <p className="text-lg text-[var(--color-text-alt)]">Loading round…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] p-4">
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Guess the Song!</h2>

        <div className="flex items-center justify-center mb-4 space-x-4">
          <button onClick={togglePlayPause} className="text-primary mr-4 hover:text-primary-variant transition">
            {isPlaying ? "⏸️ Pause Preview" : "▶️ Play Preview"}
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-sm">
              Volume: {Math.round(volume * 100)}%
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24"
            />
          </div>
        </div>
        <audio
            ref={audioRef}
            src={song.previewURL}
            preload="auto"
            onEnded={() => setIsPlaying(false)}
          />

        <div className="flex items-center bg-[var(--color-secondary)] border border-[var(--color-border)] rounded-full px-4 py-2 mt-6">
          <input
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Guess the song title..."
            className="flex-grow bg-transparent text-[var(--color-text)] placeholder-[var(--color-text-alt)] focus:outline-none px-2"
          />
          <button
            onClick={() => makeGuess(guess)}
            disabled={guessResult === true}
            className={`ml-2 p-2 rounded-full transition ${
              guessResult === true
                ? "bg-[var(--color-border)] cursor-not-allowed"
                : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-variant)]"
            }`}
          >
            <svg
              className="w-5 h-5 text-[var(--color-secondary)]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 18l6-6-6-6v12z" />
            </svg>
          </button>
          {suggestions.length > 0 && (
          <ul  className="
                            absolute left-0 top-full
     w-full
     bg-surface border border-border
     rounded-b-lg overflow-auto z-10
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

        {guessResult === false && (
          <p className="text-red-500 font-semibold mt-4 text-center">
            ❌ Wrong—try again!
          </p>
        )}
      </div>
    </div>
  );
};

export default MultiplayerGame;
