/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * This is the navigation file that takes care of all router
 */

import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
//import { ErrorBoundary } from 'src/components';
import * as Pages from 'src/pages';

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Pages.Login />} />
          {/* ALL RESTRICTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth permission={'view_dashboard'}>
                <Pages.Login />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const NotFound = () => {
  return <h1>404 Not Found</h1>;
};

const Forbidden = () => {
  return <h1>403 Forbidden. You dont have access to this page.</h1>;
};

const RequireAuth = ({ permission, ...props }) => {
  const location = useLocation();
  const { userSession } = useSelector((state) => state.session);

  if (userSession == null)
    // Still loading data from localstorage
    return (
      <div className="preloader">
        <img src={loader} className="w-60" />
      </div>
    );
  else if (userSession == '')
    // Localstorage loaded but no user session found. Redirect to login page.
    return <Navigate to="/" state={{ from: location }} />;
  else if (!userSession?.permissions.includes(permission))
    // User don't have access
    return <Forbidden />;
  else return props.children; // Session present and Localstorage loaded
};

export default Navigation;
