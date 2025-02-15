import { createSlice } from '@reduxjs/toolkit';
import { persistor } from '../store';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  loginTimestamp: localStorage.getItem('loginTimestamp')
    ? parseInt(localStorage.getItem('loginTimestamp'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.loginTimestamp = Date.now();
      localStorage.setItem('loginTimestamp', Date.now().toString());
    },
    logout: (state) => {
      state.userInfo = null;
      state.loginTimestamp = null;
      localStorage.removeItem('loginTimestamp');
    localStorage.removeItem('persist:root')
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;