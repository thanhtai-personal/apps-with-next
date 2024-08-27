
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import bgImage3 from "@/assets/images/app-bg-3.png"
import { Navigator } from "./Navigator";
import { ModalId, useGoatTapStore } from "@core-ui/react-goat-tap";
import { useAppBg } from "@/hooks/useAppBg";

export const SearchResult = observer(() => {
  const { gameStore } = useGoatTapStore();

  useAppBg(bgImage3)

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