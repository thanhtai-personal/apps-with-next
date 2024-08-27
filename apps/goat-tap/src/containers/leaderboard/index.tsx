import { observer } from "@core-ui/react-mobx-state";
import { Flex, LazyImage, Text } from "@core-ui/react-mui-core";
import bgImage3 from "@/assets/images/app-bg-3.png"
import { useGoatTapStore, useLeaderBoard } from "@core-ui/react-goat-tap";
import { MIN_CONTENT_HEIGHT } from "@/utils/constants";
import { useAppBg } from "@/hooks/useAppBg";
import { useGlobalStyles } from "@/styles/globalStyle";
import leaderBoard360 from "@/assets/images/prize-seat.png"
import { WinnerCard } from "@/components/WinnerCard";
import { TopGoatTokenBlock } from "@/components/TopGoatTokenBlock";
import { IFamousPerson } from "@core-ui/goat-tap-types";
import { useBottomMenu } from "@/hooks/useBottomMenu";

const LeaderBoardContainer = observer(() => {
  const globalStyles = useGlobalStyles();
  const { gameStore } = useGoatTapStore();

  const { topGoats } = useLeaderBoard();
  const [firstWinner = {} as IFamousPerson, secondWinner = {} as IFamousPerson, thirdWinner = {} as IFamousPerson
    , ...otherWinners] = topGoats;

  useBottomMenu();
  useAppBg(bgImage3);

  return (
      <Flex fullWidth column>
        <Flex minHeight={MIN_CONTENT_HEIGHT} column fullWidth centerY p={2} position={"relative"}>
          <Flex fullWidth center mt={4}>
            <Text className={globalStyles.textOrbi32}>
              Leaderboard
            </Text>
          </Flex>

          <Flex fullWidth center column mt={4}>
            <Flex fullWidth center maxWidth={360}>
              <Flex
                flex={1}
                style={{
                  transform: "translateY(35px)"
                }}
              >
                <WinnerCard winner={secondWinner} />
              </Flex>
              <Flex
                flex={1}
              >
                <WinnerCard winner={firstWinner} />
              </Flex>
              <Flex
                flex={1}
                style={{
                  transform: "translateY(65px)"
                }}>
                <WinnerCard winner={thirdWinner} />
              </Flex>
            </Flex>
            <Flex fullWidth center>
              <LazyImage src={leaderBoard360} style={{ width: 360 }} />
            </Flex>
          </Flex>

          <Flex fullWidth mt={2}>
            <TopGoatTokenBlock total={gameStore.famousPeoplePaging?.total} data={otherWinners || []} noTitle noActiveFirst noTokenAddress textNormal rankStartNumber={4} />
          </Flex>

        </Flex>
      </Flex>)
});

export default LeaderBoardContainer;
