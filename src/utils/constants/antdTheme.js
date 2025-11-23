/**
 * @version 0.0.1
 * Updated On : August 28, 2024
 * Antd theme Constants here
 */

export const ANTD_THEME_LIGHT = {
  token: { controlHeight: 40, colorPrimary: '#ED9E2C' },
  components: { Layout: { headerBg: 'transparent', siderBg: '#FFF', bodyBg: '#23292F' } }
};

export const ANTD_THEME_DARK = {
  token: { controlHeight: 40 },
  components: { Layout: { headerBg: 'transparent', siderBg: '#FF0000' } }
};

export const THEMES = { LIGHT: 'light', DARK: 'dark', SYSTEM: 'system' };
