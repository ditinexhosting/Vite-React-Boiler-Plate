/**
 * @version 0.0.1
 * Updated On : December 7, 2024
 * This is a wrapper element on the root component.
 * It handles all additional work and states needed before initializing root component.
 */
import { Alert, ConfigProvider, theme } from "antd";
import enUS from "antd/locale/en_US";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Loader } from "src/components";
import { CONFIG } from "src/config";
import { useTanstackQuery, useTheme } from "src/hooks";
import Navigation from "src/navigation";
import { loadingStart, loadingStop, logout, setPermission } from "src/redux/action";
import { API } from "src/services";
import { ANTD_THEME_DARK, ANTD_THEME_LIGHT, THEMES, ROUTES } from "src/utils";
const { ErrorBoundary } = Alert;
const { darkAlgorithm, defaultAlgorithm } = theme;
dayjs.locale("en");

// eslint-disable-next-line react/prop-types
const AuthorizedWrapper = ({ children }) => {
  //-------------- State & Variables --------------//
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isSuccess, isPending, refetch } = useTanstackQuery(
    API.DASHBOARD.GetUserDetailsByToken
  )();

  //-------------- Use Effects --------------//

  /** Fetch basic user data and permission from server */
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setPermission(data.permissions));
    }
  }, [data, isSuccess]);

  /** Load full screen loader until basic user data and permission fetched from server */
  useEffect(() => {
    if (isPending) {
      dispatch(loadingStart());
    } else {
      dispatch(loadingStop());
    }
  }, [isPending]);

  /**
   * Triger logout from anywhere in the application via global config
   */
  useEffect(() => {
    CONFIG.TRIGGER_LOGOUT = () => {
      dispatch(logout());
      dispatch(loadingStop(false));
      return navigate(ROUTES.HOME);
    };
  }, []);

  //-------------- Other Methods --------------//

  return <>{children}</>;
};

export { AuthorizedWrapper };
