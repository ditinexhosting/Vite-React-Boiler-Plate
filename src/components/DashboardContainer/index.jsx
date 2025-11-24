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
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

export const DashboardContainer = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen! bg-amber-600">
      <HeaderComponent />
      <Layout>
        <Sider width="15%" trigger={null} collapsible collapsed={collapsed}>
          Sider
          <Button
            type="text"
            icon={collapsed ? <CircleChevronRight /> : <CircleChevronLeft />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
        </Sider>
        <Layout className="p-3">
          <Breadcrumb
            items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
            style={{ margin: "16px 0" }}
          />
          <Content>
            <Space>
              <Input />
              <Button type="primary">Button</Button>
            </Space>
            <Outlet />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
