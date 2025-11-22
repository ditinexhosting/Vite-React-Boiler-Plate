import axios from 'axios';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { CONFIG } from 'src/config';
import { login } from 'src/redux/action';
import store from 'src/redux/store';
import { API } from 'src/services';
import { sanitizeUserData } from 'src/utils';

/**
 * Axios API instances with base URL from the environment config.
 */
export const axiosApi = axios.create({
  baseURL: CONFIG.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const axiosMultiPartApi = axios.create({
  baseURL: CONFIG.VITE_API_URL,
  headers: { 'Content-Type': 'multipart/form-data' }
});

/**
 * Wrap axios call with access token header / multipart.
 * Auto refresh token if token is expired.
 * @param {function} originalFunction original axios instance.
 * @param {boolean} is_multipart whether to send multipart or not.
 * @returns {Object|null} response data or null on error.
 */
export const withAccessToken = (originalFunction, is_multipart = false) => {
  return async function (...args) {
    const {
      session: { userSession }
    } = store.getState();
    const dispatch = store.dispatch;
    let access_token = userSession?.access_token;
    const access_token_expiry = userSession?.access_token_expiry;
    const now = dayjs().add(5, 'minute');

    console.log('Token expiry >> ', !dayjs(access_token_expiry).isAfter(now)); // TODO: console cleanup

    if (!dayjs(access_token_expiry).isAfter(now) && CONFIG.REFRESH_TOKEN_IN_PROGRESS === false) {
      CONFIG.REFRESH_TOKEN_IN_PROGRESS = true;
      try {
        const result = await API.RefreshToken({
          email: userSession?.email,
          refresh_token: userSession?.refresh_token
        });
        if (result && result.refresh_token && result.access_token) {
          access_token = result.access_token;
          dispatch(login(sanitizeUserData(result)));
        }
      } catch (e) {
        throw e;
      } finally {
        CONFIG.REFRESH_TOKEN_IN_PROGRESS = false;
      }
    }

    const headers = {
      'Content-Type': is_multipart ? 'multipart/form-data' : 'application/json',
      Authorization: `Bearer ${access_token}`
    };

    // If Refresh token is in progress for another api, then wait and recall api after new refresh token fetched, to avoid generating multiple refresh token and invalidate apis in the process
    if (CONFIG.REFRESH_TOKEN_IN_PROGRESS == true) {
      return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          try {
            console.log('Checking If token refresh progress is completed.'); // TODO: console cleanup
            if (CONFIG.REFRESH_TOKEN_IN_PROGRESS == false) {
              console.log('Refreshed'); // TODO: console cleanup
              clearInterval(interval);
              resolve(originalFunction(...args, { headers }));
            }
          } catch {
            reject('Timeinterval Promise failed.');
          }
        }, 1000);
      });
    }
    return originalFunction(...args, { headers });
  };
};

/**
 * Handles the API response and shows appropriate toast messages.
 * @param {Promise} api_call
 * @param {string|boolean} toast_success
 * @param {string|boolean} toast_loading
 * @returns {Object|null} response data or null on error.
 */
export const responseHandler = async (api_call, toast_success, toast_loading) => {
  let response = null;
  const toastId = toast;
  if (toast_loading) toast.loading(toast_loading, { id: toastId });

  try {
    response = await api_call;
    if (toast_success) toast.success(toast_success, { id: toastId });
  } catch (e) {
    response = e;
  }

  // Handle success/error response
  if (response?.status == 200) return response.data;
  else if (response?.status == 400)
    toast.error('Error 400: ' + response?.response?.data?.error, { id: toastId });
  else if (response?.status == 401) {
    toast.error(
      `Unauthorized 401: ${response?.response?.data?.error || 'Action is not permitted.'}`,
      { id: toastId }
    );
    CONFIG.TRIGGER_LOGOUT();
  } else if (response?.status == 403)
    toast.error('Unauthorized 403: Action forbidden.', { id: toastId });
  else if (response?.status === 500) toast.error(response?.response?.data?.error, { id: toastId });
  else {
    console.log('API Error >>', response);
    toast.error('Error: Something went wrong. Please contact admin.', { id: toastId });
  }

  return null;
};
