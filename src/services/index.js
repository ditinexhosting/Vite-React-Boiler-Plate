/**
 * @version 0.0.1
 * Updated On : August 29, 2024
 * Import and export apis from ./apis
 * Import it in component as API.Login()
 */
import { AuthApi } from "src/services/apis/auth";
import { DashboardApi } from "src/services/apis/dashboard";

export const API = { AUTH: AuthApi, DASHBOARD: DashboardApi };
