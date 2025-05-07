import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL + '/song'

export const getTodaysSong = async () =>
{
    try{
        const res = await axios.get(`${API_URL}/get`)
        if(res.status === 200)
        {
            const now = Math.floor(Date.now()/1000)
            const expMatch = res.data.song?.previewURL?.match(/exp=(\d+)/)
            const expiry = expMatch ? parseInt(expMatch[1]) : 0

            if(expiry < now)
            {
                const newSong = await axios.put(`${API_URL}/update-preview/${res.data.song.trackId}`)
                return newSong.data.song
            }
            return res.data.song
        }
        throw new Error('failed to get todays song')
    }
    catch(error)
    {
        throw new Error(error.message)
    }
}

export const getSuggestions = async(query) =>
{
    if(!query) return []
    try{
        const response = await axios.get(`${API_URL}/suggestions`,
            {
                params: {q: query}
            }
        )
        return response.data
    }
    catch(error)
    {
        console.error('Error fetching the suggestions', error.message)
        return []
    }
}