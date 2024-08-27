import { AppTheme, Flex } from "@core-ui/react-mui-core"
import { createStyles, makeStyles } from "@core-ui/react-mui-core/style";
import { ReactNode } from "react"
import { observer } from "@core-ui/react-mobx-state";
import { useStore } from "@/providers/GoatTapProvider";
import { Colors } from "@/styles/colors";

export const GoatTapBackgroundImage = observer(({ children, noBg }: { children: ReactNode, noBg?: boolean }) => {
  const { gameStore } = useStore();

  const styles = useStyles({
    background: gameStore.pageBg,
  });

  return <Flex fullWidth center bgcolor={Colors.white}>
    <Flex column className={styles.appBg}
      maxWidth={390}
      bgcolor={"#000"}
      style={{
        backgroundImage: noBg ? "" : `url(${gameStore.pageBg})`
      }}
    >
      {children}
    </Flex>
  </Flex>
})

const useStyles = makeStyles((_theme: AppTheme) => createStyles({
  appBg: {
    backgroundColor: "#000",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    backgroundImage: `url(${(props: any) => props.background})`
  }
}))