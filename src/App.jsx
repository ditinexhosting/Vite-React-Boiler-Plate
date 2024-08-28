/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Create App component. Return Wrapper and navigation inside and wrap Redux Provider
 */
import { Provider } from 'react-redux';
import { Wrapper } from 'src/lib';
import Navigation from 'src/navigation';
import store from 'src/redux/store';
import 'src/styles/index.css';

function App() {
  return (
    <Provider store={store}>
      <Wrapper>
        <Navigation />
      </Wrapper>
    </Provider>
  );
}

export default App;
