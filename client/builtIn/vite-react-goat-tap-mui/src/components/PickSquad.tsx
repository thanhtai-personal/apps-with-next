import { observer, useLocalObservable } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import { Banner } from "./Banner";
import { BeautyGoats } from "./BeautyGoats";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { WebAppModal } from "./WebAppModal";

export const PickSquad = observer(() => {
  const state = useLocalObservable(() => ({
    isOpenConnectWallet: false,
  }))

  return (
    <Flex column fullWidth py={2} position={"relative"}>
      <Banner />
      <Flex fullWidth mt={4}>
        <BeautyGoats onClickItem={() => {
          state.isOpenConnectWallet = true;
        }} />
      </Flex>
      {state.isOpenConnectWallet && <WebAppModal>
        <ConnectWalletButton />
      </WebAppModal>}
    </Flex>
  );
});
