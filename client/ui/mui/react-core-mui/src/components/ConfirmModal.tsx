import ClearIcon from '@mui/icons-material/Clear';
// import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import MuiDialogContent from "@mui/material/DialogContent";
import { createStyles, makeStyles, withStyles } from "@mui/styles";
import React, {
  ForwardRefRenderFunction,
  Fragment,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import Flex from "./Flex";
import Text from "./Text";
import { AppTheme } from '../theme';
import { Colors } from '../colors';
import useResponsive from '../hooks/useResponsive';
// import { useLocalStore } from '@core-utils/react-mobx-state';
// import { Observer, useLocalStore } from '@core-utils/react-mobx-state';
// import { ReactComponent as GreenTickIcon } from "assets/icons/greenTick-icon.svg";
// import { ReactComponent as RedCrossIcon } from "assets/icons/redCross-icon.svg";

interface ConfirmModalProps { }

export interface ConfirmModalMessage {
  children: string | (() => React.ReactNode);
  isSuccessErrorAlert?: "SUCCESS" | "ERROR";
  isAlertMessageOnly?: boolean;
  title?: string;
  actionText?: string;
  cancelText?: string;
  actionBtnVariant?: string;
  action?: () => void;
}

const DialogContent = withStyles((_theme: AppTheme) => ({
  root: {
    borderTop: "none",
    borderBottom: "none",
  },
}))(MuiDialogContent);

const _ConfirmModal: ForwardRefRenderFunction<any, any> = (
  props: ConfirmModalProps,
  ref: any
) => {
  const { tabletSizeDown } = useResponsive();
  const styles = useStyles(props);

  // const state = useLocalStore(() => ({
  //   isLoading: false,
  // }));

  const [messages, setMessages] = useState<ConfirmModalMessage[]>([]);

  useImperativeHandle(ref, () => ({
    addMessage: (msg: ConfirmModalMessage) => {
      setMessages((messages) => {
        return [...messages, msg];
      });
    },
  }));

  const onDismiss = (index: number) => {
    // eslint-disable-next-line prefer-const
    let newMessages = [...messages];
    newMessages.splice(index, 1);
    setMessages((messages) => {
      const newMessages = [...messages];
      newMessages.splice(index, 1);
      return newMessages;
    });
  };

  if (messages.length === 0) {
    return <div />;
  }

  // const onActionbtnClicked = async (
  //   index: number,
  //   msg: ConfirmModalMessage
  // ) => {
  //   const action = msg.action ? msg.action : () => { };
  //   state.isLoading = true;
  //   try {
  //     await action();
  //     onDismiss(index);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   state.isLoading = false;
  // };

  return (
    <Fragment>
      {messages.map((item, index) => {
        let title = item.title ? item.title : "INFO";
        const {
          isAlertMessageOnly,
          cancelText,
          isSuccessErrorAlert,
        } = item;

        return (
          <Dialog
            key={index}
            onClose={() => {
              onDismiss(index);
            }}
            aria-labelledby="customized-dialog-title"
            open={true}
            fullWidth
            maxWidth={"sm"}
            classes={{
              root: tabletSizeDown ? styles.rootMobile : styles.root,
              paper: styles.paper,
            }}
            transitionDuration={{
              appear: 500,
              enter: 200,
              exit: 300,
            }}
          >
            <DialogContent
              style={{
                background: Colors.modalBg,
              }}
              classes={{
                root: tabletSizeDown ? styles.dialogContentMobile : undefined,
              }}
            >
              <Flex
                position={"absolute"}
                top={10}
                right={10}
                cursorPointer
                onClick={() => {
                  onDismiss(index);
                }}
              >
                <ClearIcon style={{ color: "whitesmoke" }} />
              </Flex>

              <Flex
                column
                justifyContent={"space-between"}
                centerY
                minHeight={200}
                px={1}
              >
                <Flex fullWidth center py={1}>
                  <Text
                    variant="bold"
                    color="#F7F7F7"
                    style={{ fontSize: 25 }}
                  >
                    {title}
                  </Text>
                </Flex>

                {typeof item.children === "string" ? (
                  <Text
                    style={{ fontSize: 18 }}
                    color={
                      isSuccessErrorAlert !== undefined
                        ? isSuccessErrorAlert === "SUCCESS"
                          ? "success"
                          : "error"
                        : undefined
                    }
                    textAlign={"center"}
                  >
                    {item.children}
                  </Text>
                ) : (
                  item.children()
                )}

                <Flex centerY fullWidth py={3}>
                  {isAlertMessageOnly ? null : (
                    <Button
                      fullWidth
                      variant="blackOutline"
                      onClick={() => {
                        onDismiss(index);
                      }}
                      style={{ margin: "0 5px", border: `1px solid ${Colors.white}` }}
                    >
                      <Text variant='bold' color={'white'}>{cancelText || "NO"}</Text>
                    </Button>
                  )}
                  {/* <Observer>
                    {() => (
                      <LoadingButton
                        fullWidth
                        variant={"primary"}
                        onClick={() => {
                          onActionbtnClicked(index, item);
                        }}
                        style={{ margin: "0 5px" }}
                        autoFocus
                        pending={state.isLoading}
                      >
                        <Text color="inherit" variant='bold'>
                          {actionText || (isAlertMessageOnly ? "OK" : "YES")}
                        </Text>
                      </LoadingButton>
                    )}
                  </Observer> */}
                </Flex>

              </Flex>
            </DialogContent>
          </Dialog>
        );
      })}
    </Fragment>
  );
};

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    closeButton: {
      position: "absolute",
      right: -5,
      top: -5,
      color: theme.palette.grey[500],
    },
    root: {
      boxShadow: "inset 0 3px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45)",
      padding: '0 16px'
    },
    rootMobile: {
      boxShadow: "inset 0 3px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45)",
      padding: '0px'
    },
    dialogContentMobile: {
      padding: '10px'
    },
    paper: {
      boxShadow: "inset 0 3px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45)",
    },
  })
);

export const ConfirmModal = forwardRef(_ConfirmModal)

export default forwardRef(_ConfirmModal);
