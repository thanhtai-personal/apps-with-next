import { useGlobalStyles } from "@/styles/globalStyle";
import { useGoatTapStore } from "@core-ui/react-goat-tap";
import { observer, useLocalObservable } from "@core-ui/react-mobx-state";
import { Flex, Loading, OutlinedButton, Text } from "@core-ui/react-mui-core";

export const ConfirmRefillEnergy = observer(({
  renewEnergy,
}: {
  renewEnergy: () => Promise<void>
}) => {
  const globalStyles = useGlobalStyles();
  const { gameStore } = useGoatTapStore();
  const state = useLocalObservable(() => ({
    loading: false
  }))

  return (
    <Flex fullWidth center column>
      <Flex mb={2} column>
        <Text className={globalStyles.textOrbi14} textAlign={"center"}>
          Your energy will be fully refilled.
        </Text>
      </Flex>
      <OutlinedButton
        onClick={async () => {
          try {
            state.loading = true;
            await renewEnergy();
            gameStore.modalShowing = null;
          } catch (error) {

          } finally {
            state.loading = false;
          }
        }}
      >
        {state.loading ? <Loading size={16} /> : <Text className={globalStyles.textOrbiBold16}>
          Confirm
        </Text>}
      </OutlinedButton>
    </Flex>
  )
})
