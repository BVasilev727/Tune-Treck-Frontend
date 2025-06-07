import React, { useState, useRef, useEffect } from "react";
import { useMultiplayerGameLogic } from "../hooks/useMultiplayerGameLogic";
import { useNavigate } from "react-router-dom";

const MultiplayerGame = () => {
  const { opponent, song, guessResult, gameOverData, makeGuess } = useMultiplayerGameLogic();
  const navigate = useNavigate();
  const [guess, setGuess] = useState("");
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.load();
      audioRef.current.volume = volume;
    }
  }, [song, volume]);

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
            Matched vs {opponent?.name}
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

        {/* Play Preview */}
        <div className="flex items-center justify-center mb-4 space-x-4">
          <button
            onClick={() => audioRef.current.play()}
            className="flex items-center text-[var(--color-primary)] font-semibold hover:brightness-125"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 4l12 6-12 6V4z" />
            </svg>
            Play Preview
          </button>

          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 4a1 1 0 00-1 1v10a1 1 0 001 1h1V4H9zM13 4a1 1 0 011 1v10a1 1 0 01-1 1h-1V4h1z" />
            </svg>
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

        <audio ref={audioRef} src={song.previewURL} preload="auto" />

        {/* Guess input */}
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
