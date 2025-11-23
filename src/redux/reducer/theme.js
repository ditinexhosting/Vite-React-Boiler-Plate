/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Create session reducer of Redux
 */
import { createSlice } from '@reduxjs/toolkit';
import { THEMES } from 'src/utils';
import { CONFIG } from 'src/config';

const initialState = { themeMode: THEMES.SYSTEM };

const themeData = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
    }
  }
});

export const themeActions = themeData.actions;
export default themeData.reducer;
