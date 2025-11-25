/**
 * List of all available permission keys for the project
 */

export const SUPER_ADMIN_PERMISSIONS = { FULL_SUPER_ADMIN: "full::superAdmin" };

export const USER_PERMISSIONS = {
  TAB_DASHBOARD_HOME_VIEW: "view::tabDashboardHome",
  TAB_EVENT_VIEW: "view::tabEventRequest",
  TAB_EVENT_EDIT: "edit::tabEventRequest",
  TAB_EVENT_DELETE: "delete::tabEventRequest",
  TAB_CALENDER_VIEW: "view::tabCalender",
  TAB_EVENT_STAGE_VIEW: "view::tabEventStage",
  ...SUPER_ADMIN_PERMISSIONS
};
