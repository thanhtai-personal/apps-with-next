import { ReactNode } from "react"
import Flex from "./Flex";
import { useResponsive } from "../hooks";

export interface IResponsiveFlex4ColumnProps {
  items: ReactNode[];
}

export const ResponsiveFlex4Column = ({
  items
}: IResponsiveFlex4ColumnProps) => {

  const { webviewSizeDown, tabletSizeDown } = useResponsive();

  return (
    <Flex fullWidth centerX
      overflow={"hidden"}
      column={webviewSizeDown}
    >
      <Flex flex={webviewSizeDown ? "unset" : 1} column={tabletSizeDown}>
        <Flex flex={tabletSizeDown ? "unset" : 1} column overflow={"hidden"}>
          {items?.[0]}
        </Flex>

        <Flex flex={tabletSizeDown ? "unset" : 1} column overflow={"hidden"}>
          {items?.[1]}
        </Flex>
      </Flex>

      <Flex flex={webviewSizeDown ? "unset" : 1} column={tabletSizeDown}>
        <Flex flex={tabletSizeDown ? "unset" : 1} column overflow={"hidden"}>
          {items?.[2]}
        </Flex>

        <Flex flex={tabletSizeDown ? "unset" : 1} column overflow={"hidden"}>
          {items?.[3]}
        </Flex>
      </Flex>

    </Flex >
  )
}