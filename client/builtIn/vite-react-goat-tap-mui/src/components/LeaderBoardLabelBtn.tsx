import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text } from "@core-ui/react-mui-core";
import { useGlobalStyles } from "@/styles/globalStyle";
import { Colors } from "@/styles/colors";
import leaderBoardLabelBg from "@/assets/images/leader-board-label-bg.png";

export const LeaderBoardLabelBtn = observer(() => {
  const globalStyles = useGlobalStyles();

  return (
    <Flex center bgcolor={"transparent"}
      width={209}
      height={47}
      pl={6}
      pb={1}
      style={{
        backgroundImage: `url(${leaderBoardLabelBg})`,
        backgroundSize: "100% 100%"
      }}
    >
      <Text className={globalStyles.textOrbi14} color={Colors.white}>
        Leaderboard
      </Text>
    </Flex >
  )
})