

export const LANGUAGE_MAP = {
  'Tiếng Việt': 'vi-VN',
  // 'english': 'en-GB',
}

export interface SetOfThemes {
  [key: string]: Theme;
}

export type ThemeMode = "light" | "dark" | "navi" | "shade-of-blue";

export interface Theme {
  key: ThemeMode;
  name: string;
  color?: string;
}


export const setOfThemes: SetOfThemes = {
  light: {
    key: 'light',
    name: 'Light',
    color: "#fff"
  },
  dark: {
    key: 'dark',
    name: 'Dark',
    color: "#000"
  },
  navi: {
    key: 'navi',
    name: 'Navi',
    color: "#001F3F"
  },
  shadeOfBlue: {
    key: 'shade-of-blue',
    name: 'Shade of blue',
    color: "#7eb5f5",
  },
}