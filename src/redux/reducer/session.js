/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Create session reducer of Redux
 */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userSession: null,
  isLoading: true
};

const sessionData = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    loadingStart: (state) => {
      state.isLoading = true;
    },
    loadingStop: (state) => {
      state.isLoading = false;
    },
    login: (state, action) => {
      state.userSession = action.payload;
      localStorage.setItem('userSession', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userSession = null;
      localStorage.removeItem('userSession');
      localStorage.clear();
    },
    loadSessionFromLocal: (state, action) => {
      state.userSession = action.payload;
      state.isLoading = false;
    }
  }
});

export const sessionActions = sessionData.actions;
export default sessionData.reducer;
