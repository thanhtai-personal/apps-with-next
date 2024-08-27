import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text } from "@core-ui/react-mui-core";
import clsx from "@core-ui/react-mui-core/clsx";
import bgImage3 from "@/assets/images/app-bg-3.png";
import { useGlobalStyles } from "@/styles/globalStyle";
import { Colors } from "@/styles/colors";
import { GoatBalance } from "@/components/GoatBalance";
import { FreeDailyBoosters } from "@/components/FreeDailyBoosters";
import { Boosters } from "@/components/Boosters";
import { useGoatTapStore, useBooster, runBooster } from "@core-ui/react-goat-tap";
import { MIN_CONTENT_HEIGHT } from "@/utils/constants";
import { useAppBg } from "@/hooks/useAppBg";
import { useBottomMenu } from "@/hooks/useBottomMenu";

const BoostContainer = observer(() => {

  const { accountStore } = useGoatTapStore();
  const globalStyles = useGlobalStyles();
  useAppBg(bgImage3)
  const { refetchBalance }
    = useBooster(import.meta.env.VITE_TELEGRAM_BOT_WALLET_ADDRESS, import.meta.env.VITE_IS_TEST_NET);

  useBottomMenu();
  runBooster(import.meta.env.VITE_TELEGRAM_BOT_WALLET_ADDRESS, import.meta.env.VITE_IS_TEST_NET);

  return (
    <Flex fullWidth column>
      <Flex column fullWidth centerY p={2} minHeight={MIN_CONTENT_HEIGHT} position={"relative"}>
        {/* <Navigator back={"/league"} /> */}
        <Flex fullWidth center mt={4} column>
          <Text className={clsx(globalStyles.textKanit14)} color={Colors.white}>
            Your balance
          </Text>
        </Flex>
        <GoatBalance value={accountStore.account?.points || 0} mt={1} reloadBalance={refetchBalance} />
        <Text className={clsx(globalStyles.textKanit12)} fontSize={10} fontStyle={"italic"} color={Colors.white}>
          Tap in to refresh balance.
        </Text>
        <Flex fullWidth mt={4}>
          <FreeDailyBoosters />
        </Flex>

        <Flex fullWidth mt={4}>
          <Boosters />
        </Flex>
      </Flex>

    </Flex>
  );
})

export default BoostContainer;
