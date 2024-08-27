import { useState } from "react";
import { ButtonBase } from "@mui/material";
import Flex from "./Flex";
import Text from "./Text";


interface ToggleButtonProps {
  useText?: boolean;
}

export const SimpleToggleButton = ({
  useText
}: ToggleButtonProps) => {
  const [isOn, setIsOn] = useState(false);
  const selectedStyle = {
    backgroundColor: "#5BA5AF",
    borderRadius: 12,
    transitionDuration: "250ms",
    transform: "translateX(-50%)"
  };

  const unSelectedStyle = {
    backgroundColor: "#5BA5AF",
    borderRadius: 12,
    transitionDuration: "250ms",
    transform: "translateX(50%)"
  }

  const onToggle = (value: boolean) => {
    setIsOn(value);
  };

  return (
    <Flex borderRadius="12px" bgcolor={isOn ? "#EFF6F6" : "#818383"} minWidth={48} height="24px"
      style={{ overflow: "hidden", cursor: "pointer" }}
      onClick={() => onToggle(!isOn)}
    >
      <ButtonBase
        style={{ flex: 1, padding: "0 8px", ...(isOn ? selectedStyle : unSelectedStyle) }}
      >
        {useText && <Text variant="button" color={isOn ? "white" : "#5BA5AF"}>
          ON
        </Text>}
      </ButtonBase>
      {useText && <ButtonBase
        onClick={() => onToggle(false)}
      >
        <Text variant="button" color={!isOn ? "white" : "#5BA5AF"}>
          OFF
        </Text>
      </ButtonBase>}
    </Flex>
  );
};