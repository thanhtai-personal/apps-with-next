import { createTheme } from "@mui/material/styles";
import { Colors } from "./colors";
import { Layers } from "./constants";

declare module "@mui/material/Typography/Typography" {
  interface TypographyPropsVariantOverrides {
    lightBold: true;
    bold: true;
    light: true;
    link: true;
  }
}

declare module "@mui/material/Button/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    primaryOutline: true;
    blackBtn: true;
    blackOutline: true;
    whiteOutline: true;
    purpleBtn: true;
    whiteBtn: true;
  }
}

export const createAppTheme: any = ({
  colors = {},
  metrics = {},
  breakpoints,
  defaultFont,
  palette,
  components = {},
  ...nestedProps
}: {
  colors?: any;
  metrics?: any;
  breakpoints?: any;
  defaultFont?: string;
  palette?: any;
  components?: any;
} & any) => {
  const muiTheme = createTheme({
    breakpoints: breakpoints || {
      values: {
        xs: 0,
        sm: 600, // phone size
        md: 900, // tablet size
        lg: 1280, // desktop size
        xl: 1440, // max width size
      },
    },
    typography: {
      fontFamily: defaultFont || `Helvetica`,
      caption: {
        fontSize: "14px",
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: Colors.textColor,
            fontSize: 14,
          },
        },
        variants: [
          {
            props: { variant: "bold" },
            style: {
              fontWeight: "bold",
              fontSize: 14,
            },
          },
          {
            props: { variant: "light" },
            style: {
              fontWeight: 400,
              fontSize: 14,
            },
          },
          {
            props: { variant: "link" },
            style: {
              fontWeight: "bold",
              fontSize: 14,
              color: Colors.link,
              cursor: "pointer",
            },
          },
        ],
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "primary" },
            style: {
              background: "#305AE8",
              borderRadius: "30px",
              color: "white",
              textTransform: "none",

              "&.Mui-disabled": {
                backgroundColor: Colors.disabled,
                boxShadow: `none`,
                border: "none",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#305AE8",
              },
            },
          },
          {
            props: { variant: "primaryOutline" },
            style: {
              background: "white",
              borderRadius: "100px",
              color: "black",
              textTransform: "none",
              border: `1px solid ${"#305AE8"}`,

              "&.Mui-disabled": {
                backgroundColor: Colors.disabled,
                boxShadow: `none`,
                border: "none",
              },
              "&:hover": {
                background: "#F1F1F1",
              },
            },
          },
          {
            props: { variant: "blackBtn" },
            style: {
              background: Colors.primary2,
              borderRadius: "20px",
              color: "white",
              textTransform: "none",

              "&.Mui-disabled": {
                backgroundColor: Colors.disabled,
                boxShadow: `none`,
                border: "none",
              },
              "&:hover": {
                backgroundColor: `rgba(0,0,0,0.8)`,
              },
            },
          },
          {
            props: { variant: "purpleBtn" },
            style: {
              background: "#362240",
              clipPath: `polygon(20px 0,100% 0,100% 50%,calc(100% - 20px) 100%,0 100%,0 50%)`,
              borderRadius: "0px",
              color: "black",
              textTransform: "none",

              "&.Mui-disabled": {
                backgroundColor: Colors.disabled,
                boxShadow: `none`,
                border: "none",
              },
              "&:hover": {
                backgroundColor: `rgba(47,3,56,0.7)`,
              },
            },
          },
          {
            props: { variant: "blackOutline" },
            style: {
              borderRadius: "40px",
              color: "black",
              textTransform: "none",
              border: `1px solid ${Colors.black}`,
            },
          },
          {
            props: { variant: "whiteOutline" },
            style: {
              borderRadius: "40px",
              color: "black",
              textTransform: "none",
              border: `1px solid ${Colors.white}`,
            },
          },
          {
            props: { variant: "whiteBtn" },
            style: {
              borderRadius: "40px",
              color: "black",
              textTransform: "none",
              background: Colors.white,
              "&:hover": {
                backgroundColor: `rgba(255, 255, 255, 0.9)`,
              },
            },
          },
        ],

        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "1.25rem",
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          // disableRipple: false,
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {},
        },
      },
      MuiSelect: {
        defaultProps: {
          disableUnderline: true,
        },
        styleOverrides: {
          icon: {
            color: "white",
            right: `0px !important`,
          },
          outlined: {},
          select: {
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            backgroundColor: Colors.appContentBgColor,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            backgroundColor: Colors.appContentBgColor,
          },
          selected: {
            backgroundColor: Colors.gray,
          }
        },
      },
      MuiPopover: {
        styleOverrides: {
          root: {
            zIndex: Layers.notificationLayer
          }
        }
      },
      MuiDialog: {
        styleOverrides: {
          root: {
            background: "rgba(0,0,0,0.2)",
            "& .MuiDialog-paperFullWidth": {
              width: "90vw",
              maxWidth: 850
            },
            "& .MuiDialog-paper": {
              margin: 0,
              overflowX: "hidden",
              backgroundColor: "transparent",
              borderRadius: 24,
            },
            "& .MuiDialogContent-root": {},
          },
        },
      },

      MuiCheckbox: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            color: `${Colors.white} !important`,
            fontWeight: "normal !important",
            "&.Mui-selected": {
              color: `${Colors.white} !important`,
              fontWeight: "bold !important",
              background: `${"#305AE8"} !important`,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            maxWidth: "calc(100vw - 10px)",
            background: "transparent"
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paperAnchorDockedLeft: {
            borderRight: "none",
          },
          paper: {
            overflowX: "hidden",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            // background: 'transparent',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            background: "transparent",
            color: "white",
            borderBottom: `none`,
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          input: {
            color: "white",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            background: "transparent",
            border: `none`,
          },
          input: {
            borderRadius: 8,
            padding: "12px 16px",
            color: "black",
            border: `none`,
          },
          notchedOutline: {
            border: "none",
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginLeft: 0,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            opacity: `1 !important`,
            borderRadius: 5,
          },
          filledSuccess: {
            background: "#305AE8",
            border: `1px solid ${Colors.white}`,
          },
          filledError: {
            background: Colors.dangerColor,
            border: `1px solid ${Colors.white}`,
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: 0,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            zIndex: Layers.layerMax,
            background: Colors.black,
            boxShadow: `0px 1px 0px 0px rgba(255, 255, 255, 0.20) inset`,
            fontSize: 12,
            textAlign: "center",
            width: "fit-content",
          },
        },
      },
      ...components
    },
    palette: palette || {
      primary: {
        main: "#305AE8",
      },
      secondary: {
        main: Colors.secondary,
      },
    },
  });

  return {
    ...muiTheme,
    colors: {
      ...Colors,
      ...colors
    },
    metrics: {
      drawerWidth: 60,
      ...metrics
    },
    formGroup: {
      border: "1px solid #D9DAED",
      padding: "10px",
      borderRadius: 10,
    },

    autoTransformWhenHolver: {
      transition: "all .2s",

      "&:hover": {
        transform: "translateY(-5px)",
      },
    },

    input: {
      borderRadius: 5,
      border: `2px solid #84DEFF`,
      padding: "8px 16px",
    },

    glowBtn: {
      filter: `drop-shadow(rgba(252, 252, 3, 0.4) 0px 0px 14px)`,
      "&:hover": {
        filter: `drop-shadow(rgba(255, 255, 255, 0.4) 0px 0px 14px)`,
      },
    },
    ...nestedProps
  };
};

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
export type AppTheme = ReturnType<typeof createAppTheme>;