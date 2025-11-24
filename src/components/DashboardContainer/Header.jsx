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
  Segmented
} from "antd";
const { Header, Footer, Sider, Content } = Layout;
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "src/hooks";
import { THEMES } from "src/utils";
import { Outlet } from "react-router";
import { Moon, Sun } from "lucide-react";

export const HeaderComponent = () => {
  const [themeMode, changeTheme] = useTheme();

  const onToggleTheme = () => {
    changeTheme(themeMode == THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
  };

  return (
    <Header className="p-3! leading-normal! h-auto!">
      <div className="flex flex-row justify-between items-center">
        <Image
          height={40}
          width={110}
          alt="Luxe Defense Group"
          src={`public/${themeMode == THEMES.DARK ? "dark-logo.png" : "light-logo.jpeg"}`}
          preview={false}
        />
        <div className="flex flex-row items-center gap-3">
          <div>
            <Tooltip title={`Change theme.`}>
              <Segmented
                onChange={onToggleTheme}
                size={"small"}
                shape="round"
                options={[
                  { value: THEMES.DARK, icon: <Sun size={18} /> },
                  { value: THEMES.LIGHT, icon: <Moon size={18} /> }
                ]}
                className={`${themeMode == THEMES.DARK ? "light-bg" : "dark-bg"}`}
              />
            </Tooltip>
          </div>
          <Segmented
            options={["EN", "AR"]}
            onChange={(value) => {
              console.log(value); // string
            }}
          />
        </div>
      </div>
    </Header>
  );
};
