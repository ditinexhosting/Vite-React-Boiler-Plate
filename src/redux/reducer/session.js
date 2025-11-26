/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Create session reducer of Redux
 */
import { createSlice } from "@reduxjs/toolkit";
import { CONFIG } from "src/config";

const initialState = { userSession: null, isLoading: false };

const sessionData = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {
    loadingStart: (state, action) => {
      state.isLoading = action.payload || "screen";
    },
    loadingStop: (state) => {
      state.isLoading = false;
    },
    login: (state, action) => {
      state.userSession = action.payload;
    },
    logout: (state) => {
      state.userSession = null;
      localStorage.removeItem(`persist:${CONFIG.LOCAL_STORAGE_KEY}`);
      localStorage.clear();
    }
  }
});

export const sessionActions = sessionData.actions;
export default sessionData.reducer;
