import { useGlobalStyles } from "@/styles/globalStyle";
import { useGoatTapStore } from "@core-ui/react-goat-tap";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, OutlinedButton, Text } from "@core-ui/react-mui-core";

export const WalletConnected = observer(({
}: {}) => {
  const globalStyles = useGlobalStyles();
  const { gameStore } = useGoatTapStore();

  return (
    <Flex fullWidth center column>
      <Flex mb={2} column>
        <Text className={globalStyles.textOrbi14} textAlign={"center"}>
          Your wallet is connected. Please wait for the next step.
        </Text>
      </Flex>
      <OutlinedButton
        onClick={async (e: any) => {
          e.preventDefault();
          e.stopPropagation();
          gameStore.modalShowing = null;
        }}
      >
        <Flex fullWidth center>
          <Text className={globalStyles.textOrbiBold16}>
            Confirm
          </Text>
        </Flex>
      </OutlinedButton>
    </Flex>
  )
})
