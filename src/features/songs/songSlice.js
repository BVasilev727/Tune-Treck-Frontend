import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import songService from './songService'

const initialState = {
    song: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:''
}

const fetchNewSong = createAsyncThunk(
    '/song/fetchNewSong',
    async(_, thunkAPI) =>
    {
        try{
            const song = await songService.getTodaysSong();
            return song;
        }catch(error)
        {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

const songSlice = createSlice(
{
    name:'song',
    initialState,
    reducers:{
        reset: state => initialState
    },
    extraReducers: (builder) =>
    {
        builder
            .addCase(fetchNewSong.pending, (state) =>
            {
                state.isLoading = true
            })
            .addCase(fetchNewSong.fulfilled, (state, action) =>
            {
                state.isLoading = false
                state.isSuccess = true
                state.song = action.payload
            })
            .addCase(fetchNewSong.rejected, (state, action) =>
            {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = songSlice.actions
export {fetchNewSong}
export default songSlice.reducer