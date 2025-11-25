/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Create store for Redux
 */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { CONFIG } from "src/config";
import session from "src/redux/reducer/session";
import theme from "src/redux/reducer/theme";
import language from "src/redux/reducer/language";
import permission from "src/redux/reducer/permission";

const combined_reducer = combineReducers({ session, theme, language, permission });
const persist_config = {
  key: CONFIG.LOCAL_STORAGE_KEY,
  blacklist: ["permission", "theme", "language"], // Ignore reducers to get stored in persists
  storage
};
const persisted_reducer = persistReducer(persist_config, combined_reducer);

const store = configureStore({
  reducer: persisted_reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});
export const persistor = persistStore(store);
export default store;
