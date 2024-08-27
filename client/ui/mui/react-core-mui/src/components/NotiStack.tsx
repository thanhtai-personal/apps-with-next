import { enqueueSnackbar, SnackbarKey, closeSnackbar } from 'notistack';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  Fragment,
  useImperativeHandle
} from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useResponsive from "../hooks/useResponsive";

interface NotiStackProps { }

export interface NotiMessage {
  children: React.ReactNode;
  variant: "success" | "error" | "info" | "warning";
  key?: number | string;
  timeout?: number;
}

const _NotiStack: ForwardRefRenderFunction<any, any> = (
  _props: NotiStackProps,
  ref
) => {

  const { tabletSizeDown } = useResponsive();

  useImperativeHandle(ref, () => ({
    push: (msg: NotiMessage) => {
      const action = (key: SnackbarKey) => (
        <IconButton 
          aria-label="close" 
          color="inherit" 
          onClick={() => closeSnackbar(key)}
        >
          <CloseIcon />
        </IconButton>
      );

      enqueueSnackbar({
        message: (
          <span 
            style={{ 
              maxWidth: tabletSizeDown ? 300 : 500, 
              wordWrap: 'break-word', 
              whiteSpace: 'break-spaces', 
              height: 'fit-content' 
            }}
          >
            {msg.children}
          </span>
        ),
        variant: msg.variant,
        autoHideDuration: msg.timeout || 2800,
        preventDuplicate: true,
        action,
        TransitionProps: {
          direction: "down",
        },
      });
    },
  }));

  return (
    <Fragment>
    </Fragment>
  );
};

export const NotiStack = forwardRef(_NotiStack);

export default forwardRef(_NotiStack);
