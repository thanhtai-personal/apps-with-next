import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text } from "@core-ui/react-mui-core";
import diamonPinkGoat from "@/assets/images/diamon-pink-goat.png";
import { useGlobalStyles } from "@/styles/globalStyle";
import { Colors } from "@/styles/colors";
import { formatNumberWithCommas } from "@core-utils/utils-helpers"
import leaderBoardValueBg from "@/assets/images/leaderboard-value.png";

export const LeaderBoardValueButton = observer(() => {
  const globalStyles = useGlobalStyles();

  return (
    <Flex center bgcolor={"transparent"}
      width={209}
      height={47}
      pt={1}
      style={{
        backgroundImage: `url(${leaderBoardValueBg})`,
        backgroundSize: "100% 100%"
      }}
    >
      <img src={diamonPinkGoat} width={32} height={32} />
      <Text ml={1} className={globalStyles.textOrbi14} color={Colors.white}>
        {formatNumberWithCommas(630928380)}
      </Text>
    </Flex>
  )
})