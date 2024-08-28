import { sessionActions } from 'src/redux/reducer/session';

// Actions from SessionReducer
export const { loadingStart, loadingStop, login, logout, loadSessionFromLocal } = sessionActions;

export const { setUploadProgress } = uploadActions;
