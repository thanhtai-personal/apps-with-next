import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text } from "@core-ui/react-mui-core";
import { Banner } from "@/components/Banner";
import { BeautyGoats } from "@/components/BeautyGoats";
import { ModalId, SceneNames, useGoatTapStore } from "@core-ui/react-goat-tap";
import { Input } from "@core-ui/react-mui-core/materials";
import { LoadMoreButtonWrapper } from "@core-ui/react-viewframe";
import { useDebounce } from "@core-utils/utils-helpers";
import { useGlobalStyles } from "@/styles/globalStyle";
import { useLayoutEffect } from "react";
import { useStore } from "@/store/index";

const PickGoatContainer = observer(() => {
  const globalStyles = useGlobalStyles();
  const { gameStore, accountStore, pickGoatStore } = useGoatTapStore();
  const { uiStore } = useStore();

  const debouncedSearch = useDebounce((value) => {
    gameStore.famousPeopleFilter = { name: value };
    gameStore.famousPeoplePaging.limit = 10;
  }, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  useLayoutEffect(() => {
    uiStore.useBottomMenu = false;

    return () => {
      uiStore.useBottomMenu = true;
    }
  }, [])

  useLayoutEffect(() => {
    if (!!accountStore.account?.famousPerson && !!accountStore.account?.telegramInfo?.telegramId) {
      gameStore.scene = SceneNames.TAP
    }
  }, [accountStore.account?.famousPerson, accountStore.account?.telegramInfo?.telegramId])

  return (<Flex column fullWidth py={2} position={"relative"}>
    <div id="top-position"></div>
    <Banner famousPeople />
    <Flex fullWidth mt={4} column>
      <Flex mx={2} mb={2} fullWidth>
        <Input fullWidth placeholder={"Search"}
          onChange={handleSearch}
        />
      </Flex>
      <BeautyGoats famousPeople onClickItem={async (item: any) => {
        pickGoatStore.selectedGoat = item;
        gameStore.modalShowing = ModalId.openConfirmModal;
        uiStore.useBottomMenu = false;
      }} />
      {gameStore.famousPeople?.length > 0 && <LoadMoreButtonWrapper
        onScrollIntoView={() => {
          gameStore.famousPeoplePaging = {
            ...gameStore.famousPeoplePaging,
            limit: parseInt(gameStore.famousPeoplePaging?.limit || 0) + 10
          }
        }}
      >
        {gameStore.famousPeopleLoading && <Flex fullWidth center><Text className={globalStyles.textOrbi16}>loading...</Text></Flex>}
      </LoadMoreButtonWrapper>}
    </Flex>
  </Flex>)
});

export default PickGoatContainer;
