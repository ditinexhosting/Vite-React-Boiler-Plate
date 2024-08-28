/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * This is a wrapper element on the root component.
 * It handles all additional work and states needed before initializing root component.
 */
//import { useErrorLog } from '@src/hooks';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from 'src/redux/store';

const Wrapper = ({ children }) => {
  //const handleError = useErrorLog('lib/Wrapper/ErrorBoundary');

  const errorHandler = (e) => {
    /* Log the error to an error reporting service */
    //handleError(e);
  };

  return (
    <Provider store={store}>
      {children}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000
        }}
      />
    </Provider>
  );
};

export { Wrapper };
