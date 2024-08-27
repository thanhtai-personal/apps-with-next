import Box, { BoxProps } from "@mui/material/Box";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { useTheme } from "@mui/styles";

import { AppTheme, PropType } from "../theme";
import { Colors } from "../colors";

const defaultColors = [
  "initial",
  "inherit",
  "primary",
  "secondary",
  "textPrimary",
  "textSecondary",
] as const;

type HexColor = string & { hexish?: any };

export type TextProps = Omit<BoxProps, "color" | "display" | "style"> &
  Omit<TypographyProps, "color"> & {
    color?:
    | (typeof defaultColors[number] | keyof PropType<AppTheme, "colors">)
    | HexColor;
  };

export const Text = (props: TextProps) => {
  const { color = Colors.white, style: styleProps = {}, textAlign, lineHeight, ...rest } = props;
  const theme: AppTheme = useTheme();
  //@ts-ignore
  const isDefaultColors = defaultColors.includes(color);
  const colorProps = isDefaultColors
    ? {
      color: color,
    }
    : undefined;
  const style: any = {
    ...styleProps,
    //@ts-ignore
    color: !isDefaultColors ? theme.colors[color] || color : undefined,
    textAlign: textAlign || styleProps.textAlign,
  };

  const boxProps = {
    ...rest,
    textAlign: undefined,
  };

  const typoProps = {
    ...rest,
    maxWidth: undefined,
    onClick: undefined,
  };

  //@ts-ignore
  return (
    <Box style={style} {...boxProps}>
      {/* @ts-ignore */}
      <Typography
        component="div"
        style={{
          lineHeight: lineHeight || "1.75em",
          ...style
        }}
        {...colorProps}
        {...typoProps}
      ></Typography>
    </Box>
  );
};

export default Text;
