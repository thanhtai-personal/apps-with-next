import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text } from "@core-ui/react-mui-core";
import clsx from "@core-ui/react-mui-core/clsx"
import { useEffect } from "react";
import bgImage from "@/assets/images/app-bg-1.png"
import bgImage3 from "@/assets/images/app-bg-3.png"
import { useGlobalStyles } from "@/styles/globalStyle";
import { Colors } from "@/styles/colors";
import { GoatBalance } from "./GoatBalance";
import { FreeDailyBoosters } from "./FreeDailyBoosters";
import { Boosters } from "./Boosters";
import { MegaCharge } from "./MegaCharge";
import { SuperCharge } from "./SuperCharge";
import { WebAppModal } from "./WebAppModal";
import { BoostSuccess } from "./BoostSuccess";
import { Navigator } from "./Navigator";
import { GettingPoints } from "./GettingPoints";
import { useStore } from "@/providers/GoatTapProvider";
import { ModalId } from "@/store/RevampGameStore";

export const Booster = observer(() => {
  const { gameStore } = useStore();
  const globalStyles = useGlobalStyles();

  useEffect(() => {
    gameStore.pageBg = bgImage3;
    return () => {
      gameStore.pageBg = bgImage;
    }
  }, [])

  return (
    <Flex column fullWidth centerX pb={2} position={"relative"}>
      <Navigator back={"/league"} />

      <Flex fullWidth center mt={4}>
        <Text className={clsx(globalStyles.textKanit14)} color={Colors.white}>
          Your balance
        </Text>
      </Flex>
      <GoatBalance value={2050000} mt={1} />
      <Flex fullWidth center mt={1}>
        <Text className={clsx(globalStyles.hoverUnderLine, globalStyles.textKanit14)} color={"#305AE8"}>
          How boosts works?
        </Text>
      </Flex>

      <Flex fullWidth mt={4}>
        <FreeDailyBoosters />
      </Flex>

      <Flex fullWidth mt={4}>
        <Boosters />
      </Flex>
      {gameStore.modalShowing === ModalId.megaCharge && <WebAppModal>
        <MegaCharge />
      </WebAppModal>}
      {gameStore.modalShowing === ModalId.superCharge && <WebAppModal>
        <SuperCharge />
      </WebAppModal>}
      {gameStore.modalShowing === ModalId.boostSuccess && <WebAppModal>
        <BoostSuccess />
      </WebAppModal>}
      {gameStore.modalShowing === ModalId.gettingPoints && <WebAppModal>
        <GettingPoints />
      </WebAppModal>}
    </Flex>
  )
})