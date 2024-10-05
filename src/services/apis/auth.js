/**
 * @version 0.0.1
 * Updated On : August 29, 2024
 * APIs related to Authentication
 */
import { axiosApi, responseHandler } from 'src/services/core';

export const AuthApi = {
  /**
   * Login API
   * @param {object} data object data.
   * @param {string|boolean} toast_success success message if provided. Default value false.
   * @param {string|boolean} toast_loading loading message if provided. Default value false.
   * @returns {json|null} json response or null.
   */
  Login: (data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.post('/api/login/', data);
    return responseHandler(api_call, toast_success, toast_loading);
  },
  /**
   * SignUp API
   * @param {object} data object data.
   * @param {string|boolean} toast_success success message if provided. Default value false.
   * @param {string|boolean} toast_loading loading message if provided. Default value false.
   * @returns {json|null} json response or null.
   */
  SignUp: (data, toast_success = false, toast_loading = false) => {
    const api_call = axiosApi.post('/api/register/', data);
    return responseHandler(api_call, toast_success, toast_loading);
  },
};
