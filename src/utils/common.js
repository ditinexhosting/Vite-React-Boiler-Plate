/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Create all common method and functions
 */
import toast from 'react-hot-toast';
/**
 * Handles the API response
 * @param {json} response
 * @returns response data or null and show error alerts.
 */
export const handleApiResponse = (response) => {
  if (response?.status == 200) return response.data;
  else if (response?.status == 400) toast.error('Error : ' + response?.message);
  else if (response?.status == 401) toast.error('Unauthorized : Action is not permitted.');
  else if (response?.status === 500) toast.error('Error : ' + response?.message);
  else toast.error('Error : Something went wrong. Please contact admin.');
  return null;
};
