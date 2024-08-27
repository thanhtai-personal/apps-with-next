import { AppTheme, Flex } from "@core-ui/react-mui-core"
import { createStyles, makeStyles } from "@core-ui/react-mui-core/style";
import { ReactNode } from "react"
import { observer } from "@core-ui/react-mobx-state";

export const GoatTapBackground = observer(({ children }: { children: ReactNode }) => {
  const styles = useStyles({});

  return <Flex column className={styles.appBg}
    bgcolor={"#000"}
  >
    {children}
  </Flex>
})

const useStyles = makeStyles((_theme: AppTheme) => createStyles({
  appBg: {
    backgroundColor: "#000",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh"
  }
}))