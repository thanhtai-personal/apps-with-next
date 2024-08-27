import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text } from "@core-ui/react-mui-core";
import { Banner } from "@/components/Banner";
import { BeautyGoats } from "@/components/BeautyGoats";
import { ModalId, useGoatTapStore } from "@core-ui/react-goat-tap";
import { Input } from "@core-ui/react-mui-core/materials";
import { LoadMoreButtonWrapper } from "@core-ui/react-viewframe";
import { useDebounce } from "@core-utils/utils-helpers";
import { useGlobalStyles } from "@/styles/globalStyle";
import { useStore } from "@/store/index";
import { useBottomMenu } from "@/hooks/useBottomMenu";

const ChangeGoatContainer = observer(() => {
  const globalStyles = useGlobalStyles();
  const { gameStore, pickGoatStore } = useGoatTapStore();
  const { uiStore } = useStore();

  const debouncedSearch = useDebounce((value) => {
    gameStore.famousPeopleFilter = { name: value };
    gameStore.famousPeoplePaging.limit = 10;
  }, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  useBottomMenu();

  return (
    <Flex column fullWidth py={2} position={"relative"}>
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
          uiStore.useBottomMenu = false;
          gameStore.modalShowing = ModalId.openConfirmModal;
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

export default ChangeGoatContainer;
