/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Create App component. Return Wrapper and navigation inside and wrap Redux Provider
 */
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { Wrapper } from 'src/lib';
import Navigation from 'src/navigation';
import store from 'src/redux/store';
import 'src/styles/index.css';
import { ANTD_TOKEN } from 'src/utils';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: ANTD_TOKEN
        }}
      >
        <Wrapper>
          <Navigation />
        </Wrapper>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
