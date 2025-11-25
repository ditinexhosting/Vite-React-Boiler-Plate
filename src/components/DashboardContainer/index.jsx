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
  Breadcrumb
} from "antd";
const { Header, Footer, Sider, Content } = Layout;
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "src/hooks";
import { THEMES } from "src/utils";
import { Outlet } from "react-router";
import { HeaderComponent } from "./Header";
import { useState } from "react";
import { CircleChevronLeft, CircleChevronRight, Sidebar } from "lucide-react";
import { SidebarComponent } from "./Sidebar";

export const DashboardContainer = (props) => {
  return (
    <Layout className="h-screen!">
      <HeaderComponent />
      <Layout>
        <SidebarComponent {...props} />
        <Layout className="pl-3 rtl:pr-3 rtl:pl-0 !overflow-y-auto">
          <Breadcrumb
            items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
            style={{ margin: "16px 0" }}
          />
          <Content>
            <div className="flex flex-col"></div>
            <Outlet />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
