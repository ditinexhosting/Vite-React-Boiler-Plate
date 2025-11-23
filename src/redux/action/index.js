/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Create action for Redux
 */
import { sessionActions } from 'src/redux/reducer/session';
import { themeActions } from 'src/redux/reducer/theme';
// Actions from SessionReducer
export const { loadingStart, loadingStop, login, logout } = sessionActions;
// Actions from ThemeReducer
export const { setThemeMode } = themeActions;
