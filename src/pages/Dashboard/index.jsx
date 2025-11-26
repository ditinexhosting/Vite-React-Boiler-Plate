/**
 * @version 0.0.1
 * Updated On : Aug 28, 2024
 * This is the Login page.
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
import { setThemeMode } from "src/redux/action";
import { THEMES } from "src/utils";
import { DashboardContainer } from "src/components";

export const Dashboard = () => {
  return <div>Dashboard Page</div>;
};
