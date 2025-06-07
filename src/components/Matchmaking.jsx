import React, { useEffect } from "react"
import { useMatchmakingLogic } from "../hooks/useMatchmakingLogic"
import { useNavigate } from "react-router-dom"

const Matchmaking = () => {
  const { findMatch, queueTime, matched, roomId, opponent } = useMatchmakingLogic()
  const navigate = useNavigate()

  useEffect(() => {
    if (matched && roomId) {
      navigate(`/multiplayer/${roomId}`, { state: { opponent } })
    }
  }, [matched, roomId, opponent, navigate])

  return (
    <div className="bg-bg text-text min-h-screen">
      <main className="pt-24 pb-12 px-4 flex flex-col items-center">
        <div className="w-full max-w-md bg-surface border border-border rounded-lg p-6">
          
          <h2 className="text-xl font-semibold mb-6 text-center">
            Play vs Player
          </h2>

          <button
            onClick={findMatch}
            className="
              w-full
              bg-primary
              text-surface
              py-2 px-4
              rounded-full
              hover:bg-primary-variant
              transition
            "
          >
            Find Match
          </button>

          {queueTime > 0 && (
            <p className="mt-4 text-center text-text-alt">
              Waiting in queue: {queueTime} s
            </p>
          )}

        </div>
      </main>
    </div>
  )
}

export default Matchmaking
