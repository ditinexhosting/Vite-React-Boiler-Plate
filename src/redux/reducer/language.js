/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Create session reducer of Redux
 */

import { CONFIG } from "@/config";
import { LANGUAGES, RTL_SUPPORTED_LANGUAGES } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transcript: LANGUAGES[CONFIG.DEFAULT_LANGUAGE],
  activeLanguage: CONFIG.DEFAULT_LANGUAGE,
  isRTL: CONFIG.DEFAULT_LANGUAGE_IS_RTL
};

const languageData = createSlice({
  name: "language",
  initialState: initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.transcript = LANGUAGES[action.payload] ?? LANGUAGES[CONFIG.DEFAULT_LANGUAGE];
      state.activeLanguage = LANGUAGES[action.payload] ? action.payload : CONFIG.DEFAULT_LANGUAGE;
      state.isRTL = RTL_SUPPORTED_LANGUAGES.includes(state.activeLanguage) ? true : false;
    }
  }
});

export const languageActions = languageData.actions;
export default languageData.reducer;
