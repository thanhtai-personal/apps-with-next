import { AppTheme, Flex } from "@core-ui/react-mui-core"
import { createStyles, makeStyles } from "@core-ui/react-mui-core/style";
import { ReactNode } from "react"
import { observer } from "@core-ui/react-mobx-state";
import { Colors } from "@/styles/colors";
import { BOTTOM_MENU_HEIGHT, MOBILE_SIZE } from "@/utils/constants";
import { useDeviceDetection, useGoatTapStore } from "@core-ui/react-goat-tap";
import pageBg1 from "@/assets/images/app-bg-1.png"
import { useStore } from "../store";
import { ScrollContainer } from "./common";

export const GoatTapBackgroundImage = observer(({ children, noBg }: { children: ReactNode, noBg?: boolean }) => {
  const { gameStore } = useGoatTapStore();
  const { isIOS } = useDeviceDetection()
  const { uiStore } = useStore();
  const styles = useStyles({
    background: gameStore.pageBg,
  });


  if (isIOS) {
    return <Flex fullWidth center bgcolor={Colors.black}>
      <Flex fullWidth position={"relative"} className={styles.appBg}
        bgcolor={"#000"}
        height={"auto"}
        minHeight={'100vh'}
        style={{
          backgroundImage: noBg ? "" : `url(${gameStore.pageBg || pageBg1})`,
          overflow: "auto",
        }}
      >
        {/* <Parallax config={{}} /> */}
        <Flex fullWidth position={"absolute"} bgcolor={"transparent"}>
          <Flex column
            fullWidth
            maxWidth={MOBILE_SIZE}
            bgcolor={"transparent"}
            overflow={"auto"}
            // height={`calc(100vh - ${uiStore.useBottomMenu ? BOTTOM_MENU_HEIGHT : 0}px)`}
            position="relative"
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex >
  }

  return <Flex fullWidth center bgcolor={Colors.black}>
    <Flex column className={styles.appBg}
      fullWidth
      maxWidth={MOBILE_SIZE}
      bgcolor={"transparent"}
      overflow={"hidden"}
      position="relative"
      height={`calc(100vh - ${uiStore.useBottomMenu ? BOTTOM_MENU_HEIGHT : 0}px)`}
      style={{
        backgroundImage: noBg ? "" : `url(${gameStore.pageBg || pageBg1})`,
        overflow: "hidden",
      }}
    >
      {<ScrollContainer scrollY>
        {children}
      </ScrollContainer>}
    </Flex>
  </Flex >
})

const useStyles = makeStyles((_theme: AppTheme) => createStyles({
  appBg: {
    backgroundColor: "#000",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${(props: any) => props.background || pageBg1})`,
  }
}))