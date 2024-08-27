import { useGlobalStyles } from "@/styles/globalStyle";
import { useGoatTapStore } from "@core-ui/react-goat-tap";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, OutlinedButton, Text } from "@core-ui/react-mui-core";

export const AutoBoostWasSent = observer(({
  resetConnectionState
}: {
  resetConnectionState: () => void;
}) => {
  const globalStyles = useGlobalStyles();
  const { gameStore } = useGoatTapStore();

  return (
    <Flex fullWidth center column>
      <Flex mb={2} column>
        <Text className={globalStyles.textOrbi14} textAlign={"center"}>
          Your auto boost request was sent. Please wait for up to 30 seconds to see the Bot.
        </Text>
      </Flex>
      <OutlinedButton
        onClick={async (e: any) => {
          e.preventDefault();
          e.stopPropagation();
          resetConnectionState()
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
