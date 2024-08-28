/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Create action for Redux
 */
import { sessionActions } from 'src/redux/reducer/session';

// Actions from SessionReducer
export const { loadingStart, loadingStop, login, logout, loadSessionFromLocal } = sessionActions;
