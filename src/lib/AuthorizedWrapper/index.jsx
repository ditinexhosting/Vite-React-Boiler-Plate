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
import { Loader } from "src/components";
import { useTheme } from "src/hooks";
import Navigation from "src/navigation";
import { loadingStop } from "src/redux/action";
import { ANTD_THEME_DARK, ANTD_THEME_LIGHT, THEMES } from "src/utils";
const { ErrorBoundary } = Alert;
const { darkAlgorithm, defaultAlgorithm } = theme;
dayjs.locale("en");

// eslint-disable-next-line react/prop-types
const AuthorizedWrapper = ({ children }) => {
  //-------------- State & Variables --------------//

  const dispatch = useDispatch();

  //-------------- Use Effects --------------//

  //-------------- Other Methods --------------//

  return <>{children}</>;
};

export { AuthorizedWrapper };
