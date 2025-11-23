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
} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'src/hooks';
import { setThemeMode } from 'src/redux/action';
import { THEMES } from 'src/utils';

export const Login = () => {
  const [themeMode, changeTheme] = useTheme()


  return <div>
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider width="25%">
          Sider
        </Sider>
        <Layout>
          <Breadcrumb
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
            style={{ margin: '16px 0' }}
          />
          <Content>
            <Space>
              <Input />
              <Button type="primary">Button</Button>
            </Space>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
    <p>Antd Theme Code sample</p>
    <div>
      <h2>Switch Dark / Light theme</h2>
      <Space vertical>
        <Switch checkedChildren="Dark" unCheckedChildren="Light" value={themeMode == THEMES.DARK} onChange={(e) => {
          changeTheme(e == true ? THEMES.DARK : THEMES.LIGHT)
        }} />
      </Space>
    </div>

  </div>;
};
