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
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CONFIG } from "src/config";
const { ErrorBoundary } = Alert;
const { darkAlgorithm, defaultAlgorithm } = theme;
dayjs.locale("en");

const tanstackQueryClient = new QueryClient({});

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => {
  //-------------- State & Variables --------------//

  const { isLoading } = useSelector((state) => state.session);
  const [themeMode] = useTheme();
  const { isRTL } = useSelector((state) => state.language);
  const dispatch = useDispatch();

  //-------------- Use Effects --------------//

  /** Stop Loader on reload if redux persists has garbage infinite loading value */
  useEffect(() => {
    setTimeout(() => {
      if (isLoading) dispatch(loadingStop());
    }, 3000);
  }, []);

  //-------------- Other Methods --------------//

  const antd_theme = themeMode == THEMES.DARK ? ANTD_THEME_DARK : ANTD_THEME_LIGHT;

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: themeMode == THEMES.DARK ? darkAlgorithm : defaultAlgorithm,
          ...antd_theme
        }}
        locale={enUS}
        direction={isRTL ? "rtl" : "ltr"}
      >
        <ErrorBoundary>
          <QueryClientProvider client={tanstackQueryClient}>
            <div dir={isRTL ? "rtl" : "ltr"}>
              <Navigation />
              {children}
            </div>
            {CONFIG.DEV && <ReactQueryDevtools initialIsOpen={false} />}
          </QueryClientProvider>
        </ErrorBoundary>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{ className: "", duration: 5000 }}
        />
        {isLoading == "screen" && <Loader />}
      </ConfigProvider>
    </>
  );
};

export { Wrapper };
