import useMediaQuery from "@mui/material/useMediaQuery";
import { DefaultTheme, useTheme } from "@mui/styles";

type CustomSize = { [key: string]: number };

type ResponsiveQuery = {
  zeroSizeUp: boolean;
  phoneSizeUp: boolean;
  tabletSizeUp: boolean;
  webviewSizeUp: boolean;
  maxSizeUp: boolean;
  zeroSizeDown: boolean;
  phoneSizeDown: boolean;
  tabletSizeDown: boolean;
  webviewSizeDown: boolean;
  maxSizeDown: boolean;
  theme: DefaultTheme;
} & { [key: string]: boolean };

export const useResponsive: (
  customSize?: CustomSize
) => Partial<ResponsiveQuery> = (customSize = {}) => {
  const theme: any = useTheme();

  // const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const xlDown = useMediaQuery(theme.breakpoints.down('xl'));

  const xsUp = useMediaQuery(theme.breakpoints.up('xs'));
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const xlUp = useMediaQuery(theme.breakpoints.up('xl'));

  let handledCustomSize: { [key: string]: boolean } = {};
  if (customSize) {
    Object.keys(customSize).forEach((key) => {
      handledCustomSize[key] = useMediaQuery(theme.breakpoints.down(customSize[key]));
    });
  }

  return {
    minSizeUp: xsUp,
    phoneSizeUp: smUp,
    tabletSizeUp: mdUp,
    webviewSizeUp: lgUp,
    maxSizeUp: xlUp,
    phoneSizeDown: smDown,
    tabletSizeDown: mdDown,
    webviewSizeDown: lgDown,
    maxSizeDown: xlDown,
    theme,
    ...handledCustomSize,
  };
};

export default useResponsive;
