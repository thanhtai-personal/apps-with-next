
import { Colors } from "../colors";
import Flex from "./Flex";
import { ReactNode } from "react";

export interface IToggleButtonProps {
  currentValue: string;
  leftValue: string;
  rightValue: string;
  leftElement: ReactNode;
  rightElement: ReactNode;
  setCurrentValue: (value: string) => void;
  border?: string;
  bgcolor?: string;
  activeBgcolor?: string;
  style?: any;
  animationShape?: JSX.Element;
}

export const TransitionToggleButton = ({
  currentValue,
  leftValue,
  rightValue,
  leftElement,
  rightElement,
  setCurrentValue,
  border,
  bgcolor,
  activeBgcolor,
  animationShape,
  style = {},
}: IToggleButtonProps) => {

  return (
    <Flex border={border || `solid 1px ${Colors.appBorderColor}`} p={0.5}
      bgcolor={bgcolor || "initial"}
      centerY
      borderRadius={"16px"}
      position={"relative"}
      style={style}
    >
      <Flex position={"absolute"} top={0}
        left={0}
        width={"50%"}
        fullHeight
        p={animationShape ? 0 : 0.5}
        zIndex={0}
        style={{
          pointerEvents: "none",
          transitionDuration: "250ms",
          transform: currentValue === leftValue ? "" : "translateX(100%)"
        }}
      >
        {animationShape ? animationShape : <Flex
          fullWidth
          fullHeight
          borderRadius={"16px"}
          bgcolor={activeBgcolor || "rgba(255, 255, 255, 0.15)"}
        >
        </Flex>}
      </Flex>

      <Flex flex={1} px={2} py={1} center cursorPointer
        onClick={() => setCurrentValue(leftValue)}
      >
        {leftElement}
      </Flex>

      <Flex flex={1} px={2} py={1} center cursorPointer
        onClick={() => setCurrentValue(rightValue)}>
        {rightElement}
      </Flex>
    </Flex >
  )
}