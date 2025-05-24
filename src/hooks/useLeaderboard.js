import { useState, useEffect } from "react"
import axios from 'axios'

export function useLeaderboard(limit = 10)
{
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() =>
    {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_API_URL}/users/leaderboard?limit=${limit}`)
            .then(res => setPlayers(res.data))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [limit])

    return {players, loading, error}
}