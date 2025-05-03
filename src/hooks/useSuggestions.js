import { useState, useEffect } from "react";
import axios from "axios";

const API_URL =  process.env.REACT_APP_API_URL  + '/song/suggestions'

export const useSuggestions = (query) =>
{
    const [suggestions, setSuggestions] = useState([])
   
    useEffect(() =>
    {
        const fetchSuggestions = async () =>
        {
            if(!query || query.length < 2)
            {
                setSuggestions([]);
                return;
            }
            try{
                const res = await axios.get(API_URL + `?q=${encodeURIComponent(query)}`)
                setSuggestions(res.data)
            }
            catch(error)
            {
                console.error('error fetching suggesions', error)
                setSuggestions([])
            }
        }

        const delayDebounce = setTimeout(fetchSuggestions, 300)
        return () => clearTimeout(delayDebounce)

    },[query])
    return {suggestions, setSuggestions}
}