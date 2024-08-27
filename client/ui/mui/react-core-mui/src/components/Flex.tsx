
import Box, { BoxProps } from "@mui/material/Box";
import useTheme from "@mui/styles/useTheme";
import { AppTheme, PropType } from "../theme";

const defaultColors = [
  "primary.main",
  "primary.light",
  "primary.dark",
  "secondary.main",
  "secondary.main",
  "secondary.light",
  "error.light",
  "error.dark",
  "error.dark",
  "success.light",
  "success.dark",
  "success.dark",
  "info.light",
  "info.dark",
  "info.dark",
  "background.light",
  "background.dark",
  "background.dark",
] as const;
type HexColor = string & { hexish?: any };

type FlexProps = Omit<BoxProps, "bgcolor"> & {
  cursorPointer?: boolean;
  column?: boolean;
  center?: boolean;
  centerX?: boolean;
  centerY?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  fullSize?: boolean;
  bgcolor?:
  | typeof defaultColors[number]
  | keyof PropType<AppTheme, "colors">
  | HexColor;
};

export const Flex = (props: FlexProps) => {
  const theme: AppTheme = useTheme();
  const {
    bgcolor,
    style: styleProps = {},
    column,
    center,
    centerX,
    centerY,
    children,
    fullWidth,
    fullHeight,
    fullSize,
    ...rest
  } = props;
  let centerProps: any = {};
  if (center) {
    centerProps["justifyContent"] = "center";
    centerProps["alignItems"] = "center";
  }
  if (centerX) {
    centerProps["justifyContent"] = "center";
  }
  if (centerY) {
    centerProps["alignItems"] = "center";
  }
  if (column) {
    centerProps["flexDirection"] = "column";
  } else {
    centerProps["flexDirection"] = "row";
  }

  let sizeProps: any = {};
  if (fullWidth) {
    sizeProps.width = "100%"
  }
  if (fullHeight) {
    sizeProps.height = "100%"
  }
  if (fullSize) {
    sizeProps.height = "100%"
    sizeProps.width = "100%"
  }

  //@ts-ignore
  const isDefaultColors = defaultColors.includes(bgcolor);
  const colorProps = isDefaultColors
    ? {
      bgcolor: bgcolor,
    }
    : undefined;
  const style = {
    ...styleProps,
    //@ts-ignore
    backgroundColor: !isDefaultColors
      ? //@ts-ignore
      theme.colors[bgcolor] || bgcolor
      : undefined,
  };
  if (props.cursorPointer) {
    style.cursor = "pointer";
  }

  return (
    <Box
      display="flex"
      style={style}
      {...sizeProps}
      {...centerProps}
      {...colorProps}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Flex