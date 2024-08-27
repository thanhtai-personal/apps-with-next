import { Colors } from "@/styles/colors";
import { useGlobalStyles } from "@/styles/globalStyle";
import { observer } from "@core-ui/react-mobx-state";
import { AppTheme, Flex, Text } from "@core-ui/react-mui-core";
import clsx from "@core-ui/react-mui-core/clsx";
import { makeStyles, createStyles } from "@core-ui/react-mui-core/style";
import lightning48 from "@/assets/images/lightning.png"

export const FreeDailyBoosters = observer(() => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();

  return <Flex fullWidth column mx={2}>
    <Flex fullWidth >
      <Text className={clsx(globalStyles.textKanit16)} color={Colors.white}>
        Free daily boosters
      </Text>
    </Flex>
    <Flex className={styles.contentWrapper} fullWidth mt={1}>
      <Flex fullWidth centerY justifyContent={"space-between"}>
        <Flex column>
          <Text className={globalStyles.textKanitBold14}>
            Full Energy
          </Text>
          <Text className={globalStyles.textKanit14} mt={0.5}>
            3/3 available
          </Text>
        </Flex>
        <Flex>
          <img src={lightning48} style={{ width: 48 }} />
        </Flex>
      </Flex>
    </Flex>
  </Flex>
})

const useStyles = makeStyles((_theme: AppTheme) =>
  createStyles({
    contentWrapper: {
      background: "rgba(18, 22, 29, 0.6)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "16px",
      padding: "16px"
    }
  })
)