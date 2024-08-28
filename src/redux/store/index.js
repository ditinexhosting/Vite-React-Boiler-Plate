/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Create store for Redux
 */
import { configureStore } from '@reduxjs/toolkit';
import session from 'src/redux/reducer/session';

export default configureStore({
  reducer: {
    session
  }
});
