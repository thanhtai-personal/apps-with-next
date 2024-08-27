
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import { useEffect } from "react";
import bgImage from "@/assets/images/app-bg-1.png"
import bgImage3 from "@/assets/images/app-bg-3.png"
import { ModalId } from "@/store/RevampGameStore";
import { Navigator } from "./Navigator";
import { useStore } from "@/providers/GoatTapProvider";

export const SearchResult = observer(() => {
  const { gameStore } = useStore();

  useEffect(() => {
    gameStore.pageBg = bgImage3;
    return () => {
      gameStore.pageBg = bgImage;
    }
  }, [])

  return (
    <Flex column fullWidth centerX pb={2} position={"relative"}>
      <Navigator onBack={() => {
        gameStore.modalShowing = ModalId.searchKOL
      }}
        close={"/league"}
      />
    </Flex>
  )
})