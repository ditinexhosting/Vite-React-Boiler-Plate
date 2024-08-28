import { configureStore } from '@reduxjs/toolkit';
import session from 'src/redux/reducer/session';

export default configureStore({
  reducer: {
    session
  }
});
