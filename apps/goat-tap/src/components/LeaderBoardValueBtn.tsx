import { observer } from "@core-ui/react-mobx-state";
import { Flex, LazyImage, Text } from "@core-ui/react-mui-core";
import diamonPinkGoat from "@/assets/images/diamon-pink-goat.png";
import { useGlobalStyles } from "@/styles/globalStyle";
import { Colors } from "@/styles/colors";
import leaderBoardValueBg from "@/assets/images/leaderboard-value.png";
import { SceneNames, useGoatTapStore, useSceneNavigator } from "@core-ui/react-goat-tap";
import { Animates } from "@core-ui/react-animates";

export const LeaderBoardValueButton = observer(() => {
  const globalStyles = useGlobalStyles();
  const { tapStore } = useGoatTapStore();
  const navigate = useSceneNavigator();

  return (
    <Flex cursorPointer onClick={() => {
      navigate.navigate(SceneNames.CHANGE_GOAT)
    }}>
      <Flex center bgcolor={"transparent"}
        width={209}
        height={47}
        pt={1}
        style={{
          backgroundImage: `url(${leaderBoardValueBg})`,
          backgroundSize: "100% 100%"
        }}
        cursorPointer
      >
        <LazyImage src={tapStore.famousPeople?.image || diamonPinkGoat} width={28} height={28}
          style={{ borderRadius: "100%" }} />
        <Animates.TextFadeChange>
          <Text ml={1} className={globalStyles.textOrbi14} color={Colors.white}>
            {Number(tapStore.groupPoints || 0) + tapStore.unsyncPoints}
          </Text>
        </Animates.TextFadeChange>
      </Flex>
    </Flex>
  )
})