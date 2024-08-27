import { Flex, Colors, Text } from "@core-ui/react-mui-core"
import { formatNumberWithCommas } from "@core-utils/utils-helpers"
import goat48 from "@/assets/images/goat-48.png"
import { observer } from "@core-ui/react-mobx-state";
import { useGlobalStyles } from "@/styles/globalStyle";

export const GoatBalance = observer(({ value, mt }: { value: number, mt: number }) => {
  const globalStyles = useGlobalStyles();

  return (
    <Flex center fullWidth mt={mt}>
      <img src={goat48} style={{ width: 48, height: 48 }} />
      <Text ml={0.5} className={globalStyles.textOrbiBold36} color={Colors.white}>
        {formatNumberWithCommas(value)}
      </Text>
    </Flex>
  )
})