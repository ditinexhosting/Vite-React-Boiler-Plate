/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Custom ErrorLog hook to handle UI errors in prod
 */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeMode } from "src/redux/action";
import { THEMES } from "src/utils";

export const useTheme = () => {
  //-------------- State & Variables --------------//
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.theme);

  //-------------- Use Effects --------------//

  useEffect(() => {
    if (themeMode == THEMES.SYSTEM) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? THEMES.DARK
        : THEMES.LIGHT;
      dispatch(setThemeMode(systemTheme));
      applyThemeLogic(systemTheme);
    } else applyThemeLogic(themeMode);
  }, [themeMode]);

  //-------------- Other Methods --------------//

  const applyThemeLogic = (theme) => {
    document.body.setAttribute("data-theme", theme);
    if (THEMES.DARK == theme) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  };
  /**
   * On theme change between light and dark mode handle the logic here
   */
  const changeTheme = (theme) => {
    dispatch(setThemeMode(theme));
  };

  return [themeMode, changeTheme];
};
