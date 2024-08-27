
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import { useEffect } from "react";
import bgImage from "@/assets/images/app-bg-1.png"
import bgImage3 from "@/assets/images/app-bg-3.png"
// import { useGlobalStyles } from "@/styles/globalStyle";
import { SearchKOL } from "./SearchKOL";
import { WebAppModal } from "./WebAppModal";
import { Navigator } from "./Navigator";
import { useStore } from "@/providers/GoatTapProvider";
import { ModalId } from "@/store/RevampGameStore";

export const LeaderBoard = observer(() => {
  const { gameStore } = useStore();

  useEffect(() => {
    gameStore.pageBg = bgImage3;
    return () => {
      gameStore.pageBg = bgImage;
    }
  }, [])

  return (
    <Flex column fullWidth centerX pb={2} position={"relative"}>
      <Navigator back="/league"
        onSearch={() => {
          gameStore.modalShowing = ModalId.searchKOL;
        }}
      />
      {gameStore.modalShowing === ModalId.searchKOL && <WebAppModal>
        <SearchKOL />
      </WebAppModal>}
    </Flex>
  )
})