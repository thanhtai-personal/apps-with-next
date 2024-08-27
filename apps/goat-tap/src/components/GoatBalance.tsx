import { Flex, Colors, Text, LazyImage } from "@core-ui/react-mui-core"
import { formatNumberWithCommas } from "@core-utils/utils-helpers"
import goat48 from "@/assets/images/goat-48.png"
import { observer } from "@core-ui/react-mobx-state";
import { useGlobalStyles } from "@/styles/globalStyle";
import { Animates } from "@core-ui/react-animates";

export const GoatBalance = observer(({ value, mt, reloadBalance }: {
  value: number, mt: number
  reloadBalance?: () => Promise<void>

}) => {
  const globalStyles = useGlobalStyles();

  return (
    <Flex center fullWidth mt={mt} cursorPointer
      onClick={() => { reloadBalance?.() }}
    >
      <LazyImage src={goat48} style={{ width: 32, height: 32 }} containerStyle={{ width: 32, height: 32 }} />
      <Animates.TextFadeChange>
        <Text ml={0.5} className={globalStyles.textOrbiBold32} color={Colors.white}>
          {formatNumberWithCommas(value)}
        </Text>
      </Animates.TextFadeChange>
    </Flex>
  )
})