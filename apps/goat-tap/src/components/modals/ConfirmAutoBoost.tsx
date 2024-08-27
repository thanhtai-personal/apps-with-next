import { useGlobalStyles } from "@/styles/globalStyle";
import { ModalId, useBooster, useGoatTapStore } from "@core-ui/react-goat-tap";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, Loading, OutlinedButton, Text } from "@core-ui/react-mui-core";
import { formatFullDate, useInterval } from "@core-utils/utils-helpers";
import { addHours } from "date-fns"
import { BoostType } from "@core-ui/react-goat-tap";

export const ConfirmAutoBoost = observer(() => {
  const globalStyles = useGlobalStyles();
  const { boostStore, gameStore } = useGoatTapStore();
  const { buyBooster } = useBooster(import.meta.env.VITE_TELEGRAM_BOT_WALLET_ADDRESS, import.meta.env.VITE_IS_TEST_NET);

  let currentExpired = boostStore.boostItems.find(item => item.type === BoostType.AutoBoot)?.expiredAt || new Date();
  if (new Date(currentExpired) < new Date()) {
    currentExpired = new Date();
  }

  useInterval(() => {
    if (new Date(currentExpired) < new Date()) {
      currentExpired = new Date();
    }
  }, 1000)

  return (
    <Flex fullWidth center column>
      <Flex mb={2} column>
        <Text className={globalStyles.textOrbi14} textAlign={"center"}>
          Next expired time will be <span style={{ fontWeight: 700, color: "orangered" }}>{formatFullDate(addHours(new Date(currentExpired), 12))}</span>
        </Text>
        <Text className={globalStyles.textOrbi14} textAlign={"center"}>
          Are you sure you want to purchase <span style={{ fontWeight: 700, color: 'orangered' }}>12 hours</span> of auto boost at a rate of 1 point per second?.
        </Text>
      </Flex>
      <OutlinedButton
        onClick={async (e: any) => {
          e.preventDefault();
          e.stopPropagation();
          if (boostStore.buying) return;
          try {
            await buyBooster(BoostType.AutoBoot);
            boostStore.buying = false;
            gameStore.modalShowing = ModalId.autoBootWasSent;
          } catch (error) {
            boostStore.buying = false;
          }
        }}
      >
        <Flex fullWidth center>
          {boostStore.buying ? <Loading size={16} /> : <Text className={globalStyles.textOrbiBold16}>
            Confirm
          </Text>}
        </Flex>
      </OutlinedButton>
    </Flex>
  )
})
