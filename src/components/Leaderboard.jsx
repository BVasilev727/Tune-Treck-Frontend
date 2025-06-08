// src/components/Leaderboard.jsx
import React from 'react'
import { useLeaderboard } from '../hooks/useLeaderboard'
import Spinner from './Spinner'

export default function Leaderboard({ limit = 10 }) {
  const { players, loading, error } = useLeaderboard(limit)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text">
        <div className="text-center text-danger font-semibold">
          Error loading leaderboard.
        </div>
      </div>
    )
  }

  return (
    <div className="bg-bg text-text min-h-screen">
      <main className="pt-24 pb-12 px-4 flex flex-col items-center">
        <div className="w-full max-w-md bg-surface border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Top {limit} Players
          </h2>
          <ol className="divide-y divide-border">
            {players.map((p, i) => (
              <li
                key={p.name}
                className="flex items-center justify-between px-4 py-2"
              >
                <div className="flex items-center">
                  <img
                    src={p.profilePicture}
                    alt={p.name}
                    className="w-8 h-8 rounded-full mr-4"
                  />
                  <span className="font-medium">{p.name}</span>
                </div>
                <span className="font-semibold">{p.elo} Elo</span>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  )
}
