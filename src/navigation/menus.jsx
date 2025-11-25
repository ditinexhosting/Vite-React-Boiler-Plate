import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  DownOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { ROUTES } from "src/utils";
import { USER_PERMISSIONS } from "src/utils";
/**
 * Main sidebar Menu
 */
export const SIDEBAR_MAIN_MENU = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Dashbord",
    route: ROUTES.TAB_DASHBOARD_HOME,
    permission: null
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: "Events Requests",
    route: ROUTES.TAB_DASHBOARD_EVENT_REQUEST,
    permission: USER_PERMISSIONS.TAB_EVENT_VIEW
  },
  {
    key: "3",
    icon: <ContainerOutlined />,
    label: "Event Calender",
    route: ROUTES.TAB_DASHBOARD_CALENDER,
    permission: USER_PERMISSIONS.TAB_CALENDER_VIEW
  },
  { key: "4", icon: <PieChartOutlined />, label: "Option 1", permission: null },
  { key: "5", icon: <DesktopOutlined />, label: "Option 2", permission: null },
  { key: "6", icon: <ContainerOutlined />, label: "Option 3", permission: null },
  { key: "7", icon: <PieChartOutlined />, label: "Option 1", permission: null },
  {
    key: "8",
    label: "Admin",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "9",
        label: "Manage User",
        permission: null,
        route: ROUTES.TAB_DASHBOARD_ADMIN_MANAGE_USER
      },
      {
        key: "10",
        label: "Invoice",
        children: [
          {
            key: "16",
            label: "Create Invoice",
            permission: null,
            route: ROUTES.TAB_DASHBOARD_ADMIN_INVOICE_CREATE
          },
          {
            key: "17",
            label: "List Invoice",
            permission: null,
            route: ROUTES.TAB_DASHBOARD_ADMIN_INVOICE_LIST
          }
        ]
      }
    ]
  }
];

/**
 * Sidebar Profile Action Menu
 */
export const SIDEBAR_PROFILE_ACTION_MENU = [];
