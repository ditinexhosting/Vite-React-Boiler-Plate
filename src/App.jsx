/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Create App component. Return Wrapper and navigation inside and wrap Redux Provider
 */
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Wrapper } from "src/lib";
import { Loader } from "src/components";
import store, { persistor } from "src/redux/store";
import "src/styles/index.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Wrapper />
      </PersistGate>
    </Provider>
  );
}

export default App;
