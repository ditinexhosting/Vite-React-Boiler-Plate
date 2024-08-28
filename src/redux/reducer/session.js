import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userSession: null,
  isLoading: false
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
    }
  }
});

export const sessionActions = sessionData.actions;
export default sessionData.reducer;
