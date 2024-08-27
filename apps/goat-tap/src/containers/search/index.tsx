import { observer } from "@core-ui/react-mobx-state";
import { Flex, LazyImage, Text } from "@core-ui/react-mui-core";
import bgImage3 from "@/assets/images/app-bg-3.png"
import { Navigator } from "@/components/Navigator";
import { MIN_CONTENT_HEIGHT } from "@/utils/constants";
import { useAppBg } from "@/hooks/useAppBg";
import { useGlobalStyles } from "@/styles/globalStyle";
import { TopGoatTokenBlock } from "@/components/TopGoatTokenBlock";
import { SceneNames, useGoatTapStore, useSceneNavigator, useSearchGoat } from "@core-ui/react-goat-tap";
import emptyResult from "@/assets/images/404.svg"
import { useEffect } from "react";
import { useStore } from "@/store/index";

const SearchContainer = observer(() => {
  const globalStyles = useGlobalStyles();
  const navigate = useSceneNavigator();
  const { gameStore } = useGoatTapStore();
  const { uiStore } = useStore();

  useEffect(() => {
    uiStore.useBottomMenu = false;

    return () => {
      uiStore.useBottomMenu = true;
    }
  }, [])

  useAppBg(bgImage3)
  const { loadMore } = useSearchGoat();

  return ( <Flex fullWidth column>
    <Flex minHeight={MIN_CONTENT_HEIGHT} column fullWidth centerY p={2} position={"relative"}>
      <Navigator
        back="/league"
        onClose={() => {
          navigate.navigate(SceneNames.LEADERBOARD);
          gameStore.modalShowing = null;
        }}
      />

      <Flex fullWidth center mt={4}>
        <Text className={globalStyles.textOrbi32}>
          Leaderboard
        </Text>
      </Flex>

      <Flex fullWidth mt={2}>
        <TopGoatTokenBlock
          total={gameStore.famousPeoplePaging?.total} 
          data={gameStore.famousPeople}
          loadMore={loadMore}
          empty={<Flex fullWidth minHeight={350} center column>
            <LazyImage src={emptyResult} style={{ width: 200 }} />
            <Text className={globalStyles.textOrbi18}>No Result!</Text>
          </Flex>}
          noTitle noActiveFirst noTokenAddress textNormal noRanking />
      </Flex>
    </Flex>
  </Flex>)
});

export default SearchContainer;
