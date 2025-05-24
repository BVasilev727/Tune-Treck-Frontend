import React from 'react'
import { useLeaderboard } from '../hooks/useLeaderboard'

export default function Leaderboard({ limit = 10 }) {
  const { players, loading, error } = useLeaderboard(limit)

  if (loading) return <p>Loading leaderboard…</p>
  if (error)   return <p>Error loading leaderboard.</p>

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Top {limit} Players</h2>
      <ol>
        {players.map((p, i) => (
          <li key={p.name}>
            <img src={p.profilePicture}
            alt={p.name}
            style={{width:32, height: 32, borderRadius: '50%', marginRight: 8 }}/>
            <strong>{p.name}</strong> — {p.elo} Elo
          </li>
        ))}
      </ol>
    </div>
  )
}