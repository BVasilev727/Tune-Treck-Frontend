import React, {useEffect} from "react"
import { useMatchmakingLogic } from "../hooks/useMatchmakingLogic"
import {useNavigate} from 'react-router-dom'

const Matchmaking = () =>
{
    const {findMatch, queueTime, matched, roomId, opponent} = useMatchmakingLogic()
    const navigate = useNavigate()

    useEffect(() =>
    {
        if(matched && roomId)
        {
            navigate(`/multiplayer/${roomId}`, {state:{opponent}})
        }
    },[matched, roomId, opponent, navigate])

    return (
        <div>
            <h2>Play vs player</h2>
            <button onClick={findMatch}>Find match</button>
            {queueTime > 0 && <p>Waiting in queue: {queueTime} s</p>}
        </div>
    )
}

export default Matchmaking