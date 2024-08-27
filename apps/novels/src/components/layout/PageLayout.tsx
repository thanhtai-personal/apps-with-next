import { useStore } from "@/store/index";
import { observer, useLocalObservable } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import { ReactNode, useEffect } from "react";
import { Menu } from "./Menu";
import { PageSlide } from "@core-ui/react-animates";
import { TelegramProvider } from "./TelegramProvider";
import { LoadingPage } from "../LoadingPage";
import { ModalId, useBooster, useDeviceDetection, useFamousPeople, useGoatTapStore } from "@core-ui/react-goat-tap";
import { MessageQueueBoundary } from "./MessageQueueBoundary";
import { WebAppModal } from "../modals";
import { MegaCharge } from "../modals/MegaCharge";
import { SuperCharge } from "../modals/SuperCharge";
import { BoostSuccess } from "../modals/BoostSuccess";
import { GettingPoints } from "../modals/GettingPoints";
import { ConnectWalletButton } from "../modals/ConnectWalletButton";
import { ConfirmAutoBoost } from "../modals/ConfirmAutoBoost";
import { ConfirmRefillEnergy } from "../modals/ConfirmRefillEnergy";
import { WalletConnected } from "../modals/WalletConnected";
import { AutoBoostWasSent } from "../modals/AutoBoostWasSent";
import { SearchKOL } from "../modals/SearchKOL";
import { ModalConfirmGoat } from "../modals/ModalConfirmGoat"
import { GoatTapBackgroundImage } from "../GoatTapBackgroundImage";

export const PageLayout = observer(({
  children
}: {
  children: ReactNode;
}) => {
  const { uiStore } = useStore();
  const { accountStore, gameStore } = useGoatTapStore();
  const { isIOS, isWindow, isChrome } = useDeviceDetection();
  const { resetConnectionState, buyBooster, renewEnergy } = useBooster(import.meta.env.VITE_TELEGRAM_BOT_WALLET_ADDRESS, import.meta.env.VITE_IS_TEST_NET);

  useEffect(() => {
    uiStore.loadingStatus = "Getting your data...";
  }, [])

  useEffect(() => {
    if (accountStore.account) {
      uiStore.loadingStatus = "";
    }
  }, [accountStore.account]);

  useEffect(() => {
    if (accountStore.account?.id) {
      uiStore.pageLoading = false;
    }
  }, [accountStore.account?.id])

  useFamousPeople();

  return <GoatTapBackgroundImage>
    <TelegramProvider>
      <MessageQueueBoundary>
        <Flex fullSize column>
          {uiStore.pageLoading ?
            <LoadingPage isStrongPlatform={isWindow || isChrome} />
            : <Flex column fullSize pb={2}>
                {children}
            </Flex>}
          {uiStore.useBottomMenu && !(isIOS && !!gameStore.modalShowing) && <Menu />}
        </Flex>
        <WebAppModal
          opened={gameStore.modalShowing === ModalId.megaCharge}
        >
          <MegaCharge buyBooster={buyBooster} />
        </WebAppModal>
        <WebAppModal opened={gameStore.modalShowing === ModalId.superCharge}>
          <SuperCharge buyBooster={buyBooster} />
        </WebAppModal>
        <WebAppModal opened={gameStore.modalShowing === ModalId.boostSuccess}>
          <BoostSuccess />
        </WebAppModal>
        <WebAppModal opened={gameStore.modalShowing === ModalId.gettingPoints}>
          <GettingPoints />
        </WebAppModal>
        <WebAppModal opened={gameStore.modalShowing === ModalId.connectWallet}>
          <ConnectWalletButton />
        </WebAppModal>
        <WebAppModal opened={gameStore.modalShowing === ModalId.confirmAutoBoost}>
          <ConfirmAutoBoost />
        </WebAppModal>
        <WebAppModal opened={gameStore.modalShowing === ModalId.confirmRefillEnergy}>
          <ConfirmRefillEnergy renewEnergy={renewEnergy} />
        </WebAppModal>
        <WebAppModal opened={gameStore.modalShowing === ModalId.walletConnected}>
          <WalletConnected />
        </WebAppModal>
        <WebAppModal opened={gameStore.modalShowing === ModalId.autoBootWasSent}
          outSideClick={() => { resetConnectionState() }}
        >
          <AutoBoostWasSent resetConnectionState={resetConnectionState} />
        </WebAppModal>
        <WebAppModal opened={gameStore.modalShowing === ModalId.openConfirmModal}>
          <ModalConfirmGoat />
        </WebAppModal>
        <WebAppModal opened={gameStore.modalShowing === ModalId.searchKOL}>
          <SearchKOL />
        </WebAppModal>
      </MessageQueueBoundary>
    </TelegramProvider >
  </GoatTapBackgroundImage>
})