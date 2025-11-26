/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * This is the navigation file that takes care of all router
 */

import { useSelector } from "react-redux";
import {
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
  BrowserRouter,
  Routes,
  Route
} from "react-router";
import { DashboardContainer } from "src/components";
import * as Pages from "src/pages";
import { ROUTES, USER_PERMISSIONS } from "src/utils";

const Navigation = () => {
  const { allowedPermissions } = useSelector((state) => state.permission);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Pages.Login />} />
        {/* ALL RESTRICTED ROUTES */}
        <Route
          path="dashboard"
          element={
            <DashboardContainer
              allowedPermissions={allowedPermissions}
              filterSidebarMenuByPermission={true}
            />
          }
        >
          <Route
            index
            element={
              <RequireAuth permission={USER_PERMISSIONS.TAB_DASHBOARD_HOME_VIEW}>
                <Pages.Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="event-request"
            element={
              <RequireAuth permission={USER_PERMISSIONS.TAB_EVENT_VIEW}>
                <Pages.Dashboard />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
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

/**
 * Router Middleware to check if user is logged in and has permission to access the page
 * @param {*} permission
 * @returns
 */
const RequireAuth = ({ permission, ...props }) => {
  const location = useLocation();
  const { userSession } = useSelector((state) => state.session);
  const { allowedPermissions } = useSelector((state) => state.permission);

  if (userSession == null)
    // Redux persist loaded but no user session found. Redirect to login page.
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} />;
  else if (allowedPermissions && !allowedPermissions?.includes(permission))
    // User don't have access
    return <Forbidden />;
  else return props.children; // Session present
};

export default Navigation;
