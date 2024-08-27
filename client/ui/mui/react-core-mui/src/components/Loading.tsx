import { CircularProgress } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import Flex from "./Flex";

import { AppTheme } from "../theme";

interface LoadingProps {
  size?: number;
  iconStyle?: any;
  textColor?: string;
  text?: any;
  color?: any;
  style?: any;
}

export const Loading = (props: LoadingProps) => {
  const styles = useStyles(props);

  return (
    <Flex center fullSize minHeight={22} style={props.style || {}}>
      <Flex className={styles.root} center>
        <CircularProgress
          className={styles.bottom}
          size={props.size || 40}
          thickness={5}
          // color={props.color || "primary"}
          style={{
            color: props.color || "#305AE8"
          }}
          {...props}
        />
      </Flex>
    </Flex>
  );
};

const useStyles = makeStyles((_theme: AppTheme) =>
  createStyles({
    root: {
      position: "relative",
    },
    bottom: {
      color: "#305AE8",
    },
    top: {
      color: "#305AE8",
      animationDuration: "550ms",
      position: "absolute",
      left: 0,
    },
    circle: {
      strokeLinecap: "round",
    },
  })
);

export default Loading;
