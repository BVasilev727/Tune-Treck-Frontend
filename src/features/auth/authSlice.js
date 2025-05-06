import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState ={
    user: null,
    token: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    checkedAuth: false
}

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async(_, thunkAPI) =>
    {
        try{
            return await authService.getCurrentUser()
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to get user')
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => 
    {
        try{
            await authService.logout()
            return null
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'failed to logout')
        }
    }
)

export const register = createAsyncThunk(
    '/auth/register',
    async(user, thunkAPI) =>
    {
        try{
            return await authService.register(user)
        }
        catch(error)
        {
            const message = (error.message && error.response.data &&
                error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async(user, thunkAPI) =>
    {
        try{
            return await authService.login(user)
        }catch(error)
        {
            const message = (error.message && error.response.data &&
                error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const uploadProfilePicture = createAsyncThunk(
    'auth/uploadProfilePicture',
    async(imageFile, thunkAPI) =>
    {
        try{
            const token = thunkAPI.getState().auth.user.token
            const data = await authService.uploadProfilePicture(imageFile, token)
            
            return data
        }
        catch(error)
        {
            const message = (error.message && error.response.data &&
            error.response.data.message) ||
            error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const authSlice = createSlice(
    {
       name: 'auth',
       initialState,
       reducers:
       {
            reset: state =>
            {
                state.isError = false
                state.isLoading =false
                state.isSuccess = false
                state.message = ''
            }
       },
       extraReducers: builder => {
            builder
                .addCase(register.pending, (state) =>
                {
                    state.isLoading = true
                })
                .addCase(register.fulfilled, (state, action) =>
                {
                    state.isLoading = false
                    state.isSuccess = true
                    state.user = action.payload
                })
                .addCase(register.rejected, (state, action) =>
                {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                    state.user = null
                })
                .addCase(logout.fulfilled, (state) =>
                {
                    state.user = null
                    state.token = null
                })
                .addCase(login.pending, (state) =>
                {
                    state.isLoading = true
                })
                .addCase(login.fulfilled, (state, action) =>
                {
                    state.isLoading = false
                    state.isSuccess = true
                    state.user = action.payload.user
                    state.token = action.payload.token
                })
                .addCase(login.rejected, (state, action) =>
                {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                    state.user = null
                })
                .addCase(uploadProfilePicture.pending, (state) =>
                {
                    state.isLoading = true
                })
                .addCase(uploadProfilePicture.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.user = action.payload
                })
                .addCase(uploadProfilePicture.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(getCurrentUser.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(getCurrentUser.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.user = action.payload
                    state.checkedAuth = true
                })
                .addCase(getCurrentUser.rejected, (state, action) => {
                    state.isLoading = false
                    state.user = null
                    state.isError = true
                    state.message = action.payload
                    state.checkedAuth = true
                })
       }
    }
)

export const {reset} = authSlice.actions
export default authSlice.reducer