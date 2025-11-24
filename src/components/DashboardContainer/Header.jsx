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
  Badge
} from "antd";
const { Search } = Input;
const { Header, Footer, Sider, Content } = Layout;
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "src/hooks";
import { LANGUAGES, THEMES } from "src/utils";
import { Outlet } from "react-router";
import { Bell, Moon, Sun } from "lucide-react";
import { setLanguage } from "src/redux/action";

export const HeaderComponent = () => {
  const [themeMode, changeTheme] = useTheme();
  const dispatch = useDispatch();
  const { transcript, activeLanguage } = useSelector((state) => state.language);

  const onToggleTheme = () => {
    changeTheme(themeMode == THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
  };

  const onChangeLanguage = (lang) => {
    dispatch(setLanguage(lang));
  };

  return (
    <Header className="p-3! leading-normal! h-auto!">
      <div className="flex flex-row justify-between items-center">
        <Image
          height={40}
          width={110}
          alt="Luxe Defense Group"
          src={`/${themeMode == THEMES.DARK ? "dark-logo.png" : "light-logo.jpeg"}`}
          preview={false}
        />
        <div className="flex flex-row items-center gap-3">
          <Search placeholder="Search here ..." onSearch={() => {}} />
          <div className="cursor-pointer mx-3 rounded-full flex justify-center items-center">
            <Badge dot={true}>
              <Bell size={20} />
            </Badge>
          </div>
          <div>
            <Tooltip title={`Change theme.`}>
              <Segmented
                onChange={onToggleTheme}
                size={"small"}
                shape="round"
                value={themeMode}
                options={[
                  { value: THEMES.LIGHT, icon: <Sun size={18} /> },
                  { value: THEMES.DARK, icon: <Moon size={18} /> }
                ]}
              />
            </Tooltip>
          </div>
          <Segmented
            options={Object.keys(LANGUAGES)}
            value={activeLanguage}
            onChange={onChangeLanguage}
          />
        </div>
      </div>
    </Header>
  );
};
