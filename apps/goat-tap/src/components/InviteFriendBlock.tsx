import { observer } from "@core-ui/react-mobx-state";
import { Animates } from "@core-ui/react-animates";
import { formatNumberWithCommas } from "@core-utils/utils-helpers";
import goat32 from "@/assets/images/goat-32.png"
import { Colors, Flex, LazyImage, OutlinedButton, Text } from "@core-ui/react-mui-core";
import clsx from "@core-ui/react-mui-core/clsx"
import { useGlobalStyles } from "@/styles/globalStyle";

export const InviteFriendBlock = observer(() => {
  const globalStyles = useGlobalStyles();

  return (
    <Flex minHeight={250} className={clsx(globalStyles.borderTopBox)} fullWidth bgcolor={"#12161D"}
      column p={2}
    >
      <Flex fullWidth>
        <Flex flex={1} pr={2} column fullHeight>
          <LazyImage src={goat32} style={{ width: 32 }} />
          <Animates.AnimatedNumber
            value={630928380}
            incrementValue={630928380 / 40}
          >
            {(value) => (
              <Text className={globalStyles.textOrbiBold18}>
                {formatNumberWithCommas(value)}
              </Text>
            )}
          </Animates.AnimatedNumber>
          <Text className={globalStyles.orbiBold18}>
            Total score
          </Text>
        </Flex>
        <Flex flex={1} pl={2} borderLeft={"solid 1px #FFFFFF21"} fullHeight column>
          <Text className={globalStyles.textOrbiBold18}>Invite to squad</Text>
          <Text className={globalStyles.orbiBold18}>Get more GT Token</Text>
        </Flex>
      </Flex>

      <Flex fullWidth column mt={4}>
        <OutlinedButton style={{
          width: "100%",
          borderRadius: 24,
          background: Colors.white,
          padding: 12
        }}>
          <Text color={"#1B1D21"} className={globalStyles.textKanitBold16}>Invite a fren</Text>
        </OutlinedButton>
      </Flex>
      <Flex fullWidth mt={2}>
        <OutlinedButton disabled style={{
          width: "100%",
          borderRadius: 24,
          padding: 12
        }}>
          <Text className={globalStyles.textKanitBold16}>Leave squad</Text>
        </OutlinedButton>
      </Flex>
    </Flex>
  )
})