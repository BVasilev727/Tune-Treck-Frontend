import React, { useState, useEffect } from 'react'
import GameComponent from './GameComponent'
import { useGameLogic } from '../hooks/useGameLogic'

function GameContainer() {
  const { song } = useGameLogic()

  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    if (!song) {
      setReloadCount((c) => c + 1)
    }
  }, [song])

  return (
    <GameComponent key={`game-${reloadCount}`} />
  )
}

export default GameContainer