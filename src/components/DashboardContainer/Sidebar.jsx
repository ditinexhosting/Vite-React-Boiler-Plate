/**
 * @version 0.0.1
 * Updated On : Nov 23, 2025
 * This is the Dashbaord Container page.
 */

import {
  Button,
  ColorPicker,
  ConfigProvider,
  Divider,
  Form,
  Input,
  InputNumber,
  Space,
  Switch,
  Layout,
  Breadcrumb,
  Image,
  Tooltip,
  Radio,
  Segmented,
  Menu,
  Dropdown,
  theme
} from "antd";
const { Header, Footer, Sider, Content } = Layout;
const { useToken } = theme;
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "src/hooks";
import { THEMES } from "src/utils";
import { Outlet } from "react-router";
import { EllipsisVertical, Moon, Sun } from "lucide-react";
import { CircleChevronLeft, CircleChevronRight, Sidebar } from "lucide-react";
import React, { useMemo, useState } from "react";
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
import UserProfile from "src/assets/images/user.jpg";

const items = [
  { key: "1", icon: <PieChartOutlined />, label: "Option 1" },
  { key: "2", icon: <DesktopOutlined />, label: "Option 2" },
  { key: "3", icon: <ContainerOutlined />, label: "Option 3" },
  { key: "1", icon: <PieChartOutlined />, label: "Option 1" },
  { key: "2", icon: <DesktopOutlined />, label: "Option 2" },
  { key: "3", icon: <ContainerOutlined />, label: "Option 3" },
  { key: "1", icon: <PieChartOutlined />, label: "Option 1" },
  { key: "2", icon: <DesktopOutlined />, label: "Option 2" },
  { key: "3", icon: <ContainerOutlined />, label: "Option 3" },
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" },
      { key: "7", label: "Option 7" },
      { key: "8", label: "Option 8" }
    ]
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "11", label: "Option 11" },
          { key: "12", label: "Option 12" }
        ]
      }
    ]
  }
];

const itemsSecondary = [
  { key: "2", label: "My Account" },
  { key: "4", label: "Settings" },
  { type: "divider" },
  { key: "5", label: "Logout", icon: <LogoutOutlined />, danger: true }
];

export const SidebarComponent = () => {
  //-------------- State & Variables --------------//
  const [themeMode, changeTheme] = useTheme();
  const { transcript, activeLanguage, isRTL } = useSelector((state) => state.language);
  const [collapsed, setCollapsed] = useState(false);
  const { token } = useToken();

  //-------------- Use Effects --------------//

  //-------------- Other Methods --------------//

  /**
   * On click of items from sidebar footer
   * @param {*} item
   */
  const onSidebarFooterActionClick = (item) => {};

  /**
   * Render Collapse icon and handle RTL direction
   */
  const renderCollapseIcon = useMemo(() => {
    if (isRTL) {
      return collapsed ? (
        <CircleChevronLeft className="w-6! h-6!" />
      ) : (
        <CircleChevronRight className="w-6! h-6!" />
      );
    } else {
      return collapsed ? (
        <CircleChevronRight className="w-6! h-6!" />
      ) : (
        <CircleChevronLeft className="w-6! h-6!" />
      );
    }
  }, [isRTL, collapsed]);

  /**
   * Render Custom Action Popup for Profile / Sidebar footer
   * @param {*} menu
   * @returns
   */
  const customProfileActionPopupRender = (menu) => {
    const contentStyle = {
      backgroundColor: token.colorBgElevated,
      borderRadius: token.borderRadiusLG,
      boxShadow: token.boxShadowSecondary
    };
    const menuStyle = { boxShadow: "none" };
    return (
      <div style={contentStyle}>
        <div className="gap-3 flex flex-row items-center justify-between p-3">
          <div className="flex shrink-0 w-12 h-12 rounded-full overflow-hidden card-box-shadow">
            <Image
              src={UserProfile}
              width="100%"
              height="100%"
              preview={false}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col truncate">
            <span class="truncate font-medium block">Admin</span>
            <span class="text-muted truncate text-xs block">superadmin@company.com</span>
          </div>
        </div>
        <Divider size="small" className="m-0!" />
        {React.cloneElement(menu, { style: menuStyle })}
      </div>
    );
  };

  /**
   * Reusable profile pic renderer for hide and unhide on collapse
   * @param {*} hideOnCollapse
   * @returns
   */
  const grayscaleProfilePicRenderer = (hideOnCollapse = false) => {
    return (
      <div
        className={`flex shrink-0 grayscale-100 w-7 h-7 rounded-full overflow-hidden card-box-shadow ${!hideOnCollapse && "cursor-pointer"} ${hideOnCollapse && collapsed && "hidden"}`}
      >
        <Image
          src={UserProfile}
          width="100%"
          height="100%"
          preview={false}
          className="object-cover"
        />
      </div>
    );
  };

  return (
    <Sider width="15%" trigger={null} collapsible collapsed={collapsed}>
      <div className="flex flex-1 h-full relative p-3">
        <div className="flex flex-1 bg-sidebar-bg card-box-shadow rounded-lg overflow-hidden w-full flex-col">
          <div className="flex flex-1 w-full flex-col overflow-y-scroll scrollbar-hide">
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="vertical"
              theme="light"
              //inlineCollapsed={collapsed}
              items={items}
              className="rounded-lg w-full"
            />
          </div>
          <div className="bg-sidebar-footer gap-3 flex flex-row items-center justify-center p-3">
            {grayscaleProfilePicRenderer(true)}
            <div className={`flex flex-col truncate ${collapsed && "hidden"}`}>
              <span class="truncate font-medium block">Admin</span>
              <span class="text-muted truncate text-xs block">superadmin@company.com</span>
            </div>
            <Dropdown
              trigger={["click"]}
              popupRender={customProfileActionPopupRender}
              menu={{
                items: itemsSecondary,
                onClick: onSidebarFooterActionClick,
                inlineCollapsed: false
              }}
            >
              {collapsed ? (
                grayscaleProfilePicRenderer()
              ) : (
                <span className="text-3xl">
                  <EllipsisVertical className="cursor-pointer" />
                </span>
              )}
            </Dropdown>
          </div>
        </div>
        <div
          onClick={() => setCollapsed((prev) => !prev)}
          className="text-white bg-sidebar-collapse-icon hover:bg-primary inline rounded-full absolute -right-0 rtl:-left-0 rtl:right-auto top-10 cursor-pointer"
        >
          {renderCollapseIcon}
        </div>
      </div>
    </Sider>
  );
};
