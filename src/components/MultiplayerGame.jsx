import React, {useState, useRef, useEffect} from "react"
import {useMultiplayerGameLogic} from '../hooks/useMultiplayerGameLogic'

const MultiplayerGame = () =>
{
  const {opponent, song, guessResult, gameOverData, makeGuess, playAgain} = useMultiplayerGameLogic()

  const [guess, setGuess] = useState('')
  const audioRef = useRef(null)
    
  useEffect(() =>
  {
      if(song && audioRef.current) audioRef.current.load()
  }, [song])

  if(gameOverData)
  {
    console.log("someone won wow")
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>🏆 {gameOverData.winner.name} wins!</h2>
      <p>
        New Elo — {gameOverData.winner.name}: {gameOverData.winner.newElo} |{' '}
        {gameOverData.loser.name}: {gameOverData.loser.newElo}
      </p>
      <button onClick={playAgain}>Play Again</button>
    </div>
    )
  }
  if (!song) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <h2>Matched vs {opponent.name}</h2>
        <p>Loading round…</p>
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>Guess the Song!</h2>
      <audio ref={audioRef} controls src={song.previewURL} preload="auto" />
      <div style={{ margin: '1rem' }}>
        <input
          value={guess}
          onChange={e => setGuess(e.target.value)}
          placeholder="Your guess..."
        />
        <button onClick={() => makeGuess(guess)} disabled={guessResult === true}>Submit Guess</button>
      </div>
      {guessResult === false && <p>❌ Wrong—try again!</p>}
      
    </div>
  )

}
export default MultiplayerGame