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
import { findItemByKey, findItemByRoute, THEMES } from "src/utils";
import { Outlet, useLocation, useNavigate } from "react-router";
import { EllipsisVertical, Moon, Sun } from "lucide-react";
import { CircleChevronLeft, CircleChevronRight, Sidebar } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import UserProfile from "src/assets/images/user.jpg";
import { SIDEBAR_MAIN_MENU, SIDEBAR_PROFILE_ACTION_MENU } from "src/navigation/menus";
import { filterTabPermission } from "src/utils";
import { CONFIG } from "src/config";

export const SidebarComponent = ({
  allowedPermissions = [],
  filterSidebarMenuByPermission = false
}) => {
  //-------------- State & Variables --------------//
  const { transcript, activeLanguage, isRTL } = useSelector((state) => state.language);
  const { userSession } = useSelector((state) => state.session);
  const [collapsed, setCollapsed] = useState(false);
  const { token } = useToken();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  //-------------- Use Effects --------------//

  //-------------- Other Methods --------------//

  /**
   * On click of items from sidebar footer
   */
  const getCurrentlySelectedMenu = () => {
    const menuItem = findItemByRoute(SIDEBAR_MAIN_MENU, pathname);
    return menuItem.keyPath;
  };

  /**
   * On click of items from sidebar footer
   * @param {*} item
   */
  const onSidebarFooterActionClick = (item) => {
    if (item.key === "logout") {
      CONFIG.TRIGGER_LOGOUT();
    }
    navigate(item?.route ?? null);
  };

  /**
   * On click of items from sidebar main menu
   * @param {*} item
   */
  const onSidebarMenuClick = (item) => {
    const menuItem = findItemByKey(SIDEBAR_MAIN_MENU, item.key);
    navigate(menuItem?.item?.route ?? null);
  };

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
            <span className="truncate font-medium block">{userSession?.name}</span>
            <span className="text-muted truncate text-xs block">{userSession?.email}</span>
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

  /**
   * Filtered Menu after permission check
   */
  const filteredMainMenu = useMemo(() => {
    if (filterSidebarMenuByPermission)
      return filterTabPermission(SIDEBAR_MAIN_MENU, Object.values(allowedPermissions));
    else return SIDEBAR_MAIN_MENU;
  }, [allowedPermissions]);

  /**
   * Filtered Action menu after permission check
   */
  const filteredProfileActionMenu = useMemo(() => {
    if (filterSidebarMenuByPermission)
      return filterTabPermission(SIDEBAR_PROFILE_ACTION_MENU, Object.values(allowedPermissions));
    else return SIDEBAR_PROFILE_ACTION_MENU;
  }, [allowedPermissions]);

  return (
    <Sider width="15%" trigger={null} collapsible collapsed={collapsed}>
      <div className="flex flex-1 h-full relative p-3">
        {filterTabPermission}
        <div className="flex flex-1 bg-sidebar-bg card-box-shadow rounded-lg overflow-hidden w-full flex-col">
          <div className="flex flex-1 w-full flex-col overflow-y-scroll scrollbar-hide">
            <Menu
              mode="vertical"
              theme="light"
              //inlineCollapsed={collapsed}
              items={filteredMainMenu}
              onClick={onSidebarMenuClick}
              selectedKeys={getCurrentlySelectedMenu()}
              className="rounded-lg w-full"
            />
          </div>
          <div className="bg-sidebar-footer gap-3 flex flex-row items-center justify-center p-3">
            {grayscaleProfilePicRenderer(true)}
            <div className={`flex flex-col truncate ${collapsed && "hidden"}`}>
              <span className="truncate font-medium block text-black dark:text-white">
                {userSession?.name}
              </span>
              <span className="text-muted truncate text-xs block">{userSession?.email}</span>
            </div>
            <Dropdown
              trigger={["click"]}
              popupRender={customProfileActionPopupRender}
              menu={{
                items: filteredProfileActionMenu,
                onClick: onSidebarFooterActionClick,
                mode: "vertical",
                inlineCollapsed: false
              }}
            >
              {collapsed ? (
                grayscaleProfilePicRenderer()
              ) : (
                <span className="text-3xl text-black dark:text-white">
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
