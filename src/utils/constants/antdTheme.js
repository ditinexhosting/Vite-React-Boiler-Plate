/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Antd theme Constants here
 */

export const ANTD_THEME_LIGHT = {
  token: { controlHeight: 40, colorPrimary: "#667eea" },
  components: {
    Layout: { headerBg: "transparent", siderBg: "#FAFAFA", bodyBg: "#FAFAFA" },
    Menu: { colorBgContainer: "#f5f5f5" }
  }
};

export const ANTD_THEME_DARK = {
  token: { controlHeight: 40, colorPrimary: "#cb791f" },
  components: {
    Layout: { headerBg: "transparent", siderBg: "#23292F", bodyBg: "#23292F" },
    Menu: { colorBgContainer: "#000000" }
  }
};

export const THEMES = { LIGHT: "light", DARK: "dark", SYSTEM: "system" };
