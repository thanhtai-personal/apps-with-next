import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle
} from "react";

import ClearIcon from '@mui/icons-material/Clear';
import Dialog from "@mui/material/Dialog";
import MuiDialogContent from "@mui/material/DialogContent";
import { createStyles, makeStyles, withStyles } from "@mui/styles";
import Flex from "./Flex";
import { useLocalStore, observer } from "@core-utils/react-mobx-state";
import { Layers } from "./../constants";

import { useResponsive } from "../hooks";
import { AppTheme } from "../theme";

const DialogContent = withStyles((_theme: AppTheme) => ({
  root: {
    borderTop: "none",
    borderBottom: "none",
    zIndex: Layers.modalLayer
  },
}))(MuiDialogContent);

const _AppModal: ForwardRefRenderFunction<any, any> = (_props: any, ref: any) => {
  const state = useLocalStore(() => ({
    modalsProps: {},
    index: 0
  }))

  useImperativeHandle(ref, () => ({
    addModal: (_props: {
      id?, childrenProps, childrenComponent, modalProps,
      closeCallback, disabledBackdrop?, disableCloseable?
    }) => {
      if (!_props.id) state.index++;
      const index = state.index;
      state.modalsProps[_props.id || index] = {
        ..._props,
        index,
        onClose: () => {
          delete state.modalsProps[index]
        }
      }
    },
    closeModal: (keyModal) => {
      delete state.modalsProps[keyModal]
    },
  }));

  const keys = Object.keys(state.modalsProps)
  return <div>
    {keys.map((key) => {
      return <ModalItem key={key} {...state.modalsProps[key]} keyModal={key} />
    })}
  </div>
};

const ModalItem = (props: any) => {
  const styles = useStyles(props);

  const { childrenComponent, modalProps, closeCallback, onClose,
    keyModal, disabledBackdrop, disableCloseable } = props;

  const { tabletSizeDown } = useResponsive();

  return (
    <Dialog
      onClose={(_e, reason) => {
        if (disabledBackdrop && reason === "backdropClick") {
          return false;
        } else {
          onClose()
          closeCallback && closeCallback();
          return true;
        }
      }}
      aria-labelledby="customized-dialog-title"
      open={true}
      fullWidth
      maxWidth={"xl"}
      transitionDuration={{
        appear: 500,
        enter: 200,
        exit: 300,
      }}
      classes={{
        root: tabletSizeDown ? styles.rootMobile : styles.root,
        paper: styles.paper,
      }}
      {...modalProps}
    >
      <DialogContent
        style={{
          padding: modalProps.noPadding ? "0px" : '16px'
        }}
        classes={{
          root: styles.dialogContent
        }}
      >
        {!disableCloseable && (
          <Flex
            position={"absolute"}
            top={10}
            right={24}
            pt={1}
            cursorPointer
            onClick={() => {
              onClose()
              closeCallback && closeCallback();
            }}
          >
            <ClearIcon color={modalProps.closeIconColor || "white"} />
          </Flex>
        )}
        {childrenComponent && childrenComponent(keyModal, modalProps || {}, onClose)}
      </DialogContent>
    </Dialog>
  );

}

const useStyles = makeStyles((_theme: AppTheme) =>
  createStyles({
    root: {
      boxShadow: "inset 0 3px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45)",
      padding: '0px',
      zIndex: Layers.modalLayer,
    },
    rootMobile: {
      boxShadow: "inset 0 3px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45)",
      padding: '0px',
      zIndex: Layers.modalLayer,
    },
    dialogContent: {
      padding: '0px',
      overflowX: 'hidden',
    },
    paper: {
      boxShadow: "inset 0 3px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45)",
    },
  })
);

export const AppModal = observer(forwardRef(_AppModal));

export default observer(forwardRef(_AppModal));
