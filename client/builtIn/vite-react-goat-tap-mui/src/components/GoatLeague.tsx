
import { observer } from "@core-ui/react-mobx-state";
import { Flex, PercentColumn, Text } from "@core-ui/react-mui-core";
import { useEffect } from "react";
import bgImage from "@/assets/images/app-bg-1.png"
import bgImage2 from "@/assets/images/app-bg-2.png"
import { LeaderBoardValueButton } from "./LeaderBoardValueBtn";
import { LeaderBoardLabelBtn } from "./LeaderBoardLabelBtn";
import { useGlobalStyles } from "@/styles/globalStyle";
import { Colors } from "@/styles/colors";
import goat240 from "@/assets/images/goat-240.png"
import star from "@/assets/icons/star.svg"
import referral from "@/assets/icons/referral.svg"
import medal24 from "@/assets/images/medal24.png"
import lightning from "@/assets/images/lightning.png"
import leftArrowIcon from "@/assets/icons/left-arrow.svg";
import { IconButton } from "./IconButton";
import { GoatBalance } from "./GoatBalance";
import { useStore } from "@/providers/GoatTapProvider";
import { Link } from "@core-ui/react-core";

export const GoatLeague = observer(() => {
  const { gameStore } = useStore();
  const globalStyles = useGlobalStyles();

  useEffect(() => {
    gameStore.pageBg = bgImage2;
    return () => {
      gameStore.pageBg = bgImage;
    }
  }, [])

  return (
    <Flex column fullWidth pb={2} position={"relative"}>
      <Flex fullWidth px={2}>
        <LeaderBoardValueButton />
      </Flex>
      <Flex fullWidth justifyContent={"flex-end"} mt={2} px={2}>
        <LeaderBoardLabelBtn />
      </Flex>

      <GoatBalance value={2050000} mt={6} />
      <Flex center fullWidth mt={1}>
        <img src={medal24} style={{ width: 24, height: 24 }} />
        <Text mx={0.5} className={globalStyles.textKanit14} color={Colors.white}>
          Goat League
        </Text>
        <Link to="/leaderboard"
        >
          <img src={leftArrowIcon} style={{ width: 16, height: 16 }} />
        </Link>
      </Flex>

      <Flex center fullWidth mt={10}>
        <img src={goat240} style={{ width: 240 }} />
      </Flex>

      <Flex center fullWidth mt={4}>
        <Link to={"/boost"}>
          <Flex mr={1}
            cursorPointer
          >
            <IconButton icon={<img src={star} />}
              label={<Text className={globalStyles.textKanit14}>Boost</Text>}
            />
          </Flex></Link>
        <Flex ml={1}>
          <IconButton icon={<img src={referral} />}
            label={<Text className={globalStyles.textKanit14}>Referral</Text>}
          />
        </Flex>
      </Flex>
      <Flex center fullWidth mt={1} pl={8} pr={4}>
        <PercentColumn
          percents={[
            55,
            45
          ]}
          colors={["transparent", "#333840"]}
          styles={[{ background: 'linear-gradient(91.27deg, #305AE8 0%, #FFFFFF 100%)', height: "100%" }
            , { height: "100%" }
          ]}
          contents={[
            {
              justifyContent: "flex-end",
              element: <Text className={globalStyles.textKanit12} color={"#222933"}>Energy: 1814&nbsp;</Text>,
            },
            {
              element: <Text className={globalStyles.textKanit12} color={Colors.white}>/ 2500</Text>
            },
          ]}
          style={{ height: 24, width: "100%", borderRadius: "16px" }}
        />
      </Flex>

      <Flex position={"absolute"} left={8} bottom={0}>
        <img src={lightning} style={{ width: 48 }} />
      </Flex>
    </Flex>
  )
})