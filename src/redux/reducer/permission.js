/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Create session reducer of Redux
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = { allowedPermissions: [] };

const permissionData = createSlice({
  name: "permission",
  initialState: initialState,
  reducers: {
    setPermission: (state, action) => {
      state.allowedPermissions = action.payload;
    }
  }
});

export const permissionActions = permissionData.actions;
export default permissionData.reducer;
