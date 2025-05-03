import { configureStore } from '@reduxjs/toolkit';
import songReducer from '../features/songs/songSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    song: songReducer,
    auth: authReducer
  },
});
