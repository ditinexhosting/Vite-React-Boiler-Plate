/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * This is a wrapper element on the root component.
 * It handles all additional work and states needed before initializing root component.
 */
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'src/components';
import { useErrorLog } from 'src/hooks';
import { loadSessionFromLocal } from 'src/redux/action';

const Wrapper = ({ children }) => {
  //-------------- State & Variables --------------//
  const handleError = useErrorLog('lib/Wrapper');
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.session);

  //-------------- Use Effects --------------//

  /**
   * This use Effect is only used to load localstorage data into redux on page reload.
   */
  useEffect(() => {
    try {
      dispatch(
        loadSessionFromLocal(
          localStorage.getItem('userSession') ? JSON.parse(localStorage.getItem('userSession')) : ''
        )
      );
    } catch (e) {
      handleError(e);
    }
  }, []);

  //-------------- Other Methods --------------//

  return (
    <>
      {isLoading && <Loader />}
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
    </>
  );
};

export { Wrapper };
