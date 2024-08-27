import { Flex } from "@core-ui/react-mui-core";
import { ReactNode } from "react";

export const IconButton = ({
  icon,
  label
}: {
  icon?: ReactNode;
  label?: ReactNode;
}) => {

  return (<Flex cursorPointer
    bgcolor={"rgba(51, 56, 64, 0.4)"}
    borderRadius={"16px"}
    py={1}
    px={2}
    style={{
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    }}
  >
    {icon && icon}&nbsp;
    {label && label}
  </Flex>)
}