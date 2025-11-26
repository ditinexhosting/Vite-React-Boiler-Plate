/**
 * @version 0.0.1
 * Updated On : March 16, 2025
 * APIs related to Dashboard Home
 */
import { axiosApi, responseHandler, withAccessToken } from "src/services/core";
import { USER_PERMISSIONS } from "src/utils";

export const DashboardApi = {
  /**
   * Get User Details By Token API
   * @param {string|boolean} toast_success success message if provided. Default value false.
   * @param {string|boolean} toast_loading loading message if provided. Default value false.
   * @returns {json|null} json response or null.
   */
  GetUserDetailsByToken: (toast_success = false, toast_loading = false) => {
    //const api_call = withAccessToken(axiosApi.get)("/v1/dashboard/user-information");
    const api_call = {
      status: 200,
      data: {
        name: "Asif",
        email: "asifakramsk@gmail.com",
        permissions: Object.values(USER_PERMISSIONS)
      }
    };
    return responseHandler(api_call, toast_success, toast_loading);
  },
  /**
   * Get Dashboard data.
   * @param {string|boolean} toast_success success message if provided. Default value false.
   * @param {string|boolean} toast_loading loading message if provided. Default value false.
   * @returns {json|null} json response or null.
   */
  GetDashboardData: (toast_success = false, toast_loading = false) => {
    const api_call = withAccessToken(axiosApi.get)("/v1/dashboard/dashboard-data");
    return responseHandler(api_call, toast_success, toast_loading);
  }
};
