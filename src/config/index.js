/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * This file contains the default env variables declared in .env.
 * We may add other config contants here and export if needed.
 */
export const CONFIG = {
  ...import.meta.env,
  LOCAL_STORAGE_KEY: 'boiler_plate_local_storage',
  TRIGGER_LOGOUT: () => {}, // This holds a global function to trigger logout from anywhere. Initialized on dashboard.
  REFRESH_TOKEN_IN_PROGRESS: false // This flag keeps other concurrent api requests in queue until refresh token is completed.
};
