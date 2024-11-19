import { createStyles, makeStyles } from "@mui/styles";
import { ButtonBase, ButtonBaseProps } from "@mui/material"
import { ReactNode } from "react";
import { Colors } from "../colors";
import { AppTheme } from "../theme";


export interface IOutlinedButtonProps extends ButtonBaseProps {
  children: ReactNode;
  disabled?: boolean;
  style?: any;
}

export const OutlinedButton = ({
  children,
  disabled,
  style = {},
  ...nestedProps
}: IOutlinedButtonProps) => {
  const styles = useStyles();

  return (
    <ButtonBase
      className={`outlined-button ${styles.button} ${disabled ? 'disabled' : ''}`}
      style={{
        padding: '.5rem',
        border: 'solid 1px',
        borderColor: disabled ? Colors.appBorderColor : Colors.textWhite,
        borderRadius: '.8rem',
        animation: "fade 250ms ease-in-out",
        ...style
      }}
      {...nestedProps}
    >
      {children}
    </ButtonBase>
  );
};

const useStyles = makeStyles((_theme: AppTheme) =>
  createStyles({
    button: {
      '&:hover': {
        backgroundColor: Colors.appActiveBgColor,
      },
    },
  })
);
