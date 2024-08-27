import { useGlobalStyles } from "@/styles/globalStyle";
import { BOTTOM_MENU_HEIGHT, MOBILE_SIZE } from "@/utils/constants";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, LazyImage, Text } from "@core-ui/react-mui-core";
import {
  Group as GroupIcon
  , ElectricBolt as ElectricBoltIcon
  , Leaderboard as LeaderboardIcon
} from "@core-ui/react-mui-core/icons"
import { useMemo } from "react";
import goat16 from "@/assets/images/goat-32.png"
import { Link, useLocation, useNavigate } from "@core-ui/react-core";
import { Colors } from "@/styles/colors";
import { Grid } from "@core-ui/react-mui-core/materials"
import { Animates } from "@core-ui/react-animates";
import { SceneNames, useGoatTapStore, useSceneNavigator } from "@core-ui/react-goat-tap";

export const Menu = observer(() => {
  const globalStyles = useGlobalStyles();
  const ScenesNavigator = useSceneNavigator();
  const { gameStore } = useGoatTapStore();

  const menuItems = useMemo(() => {
    return [
      {
        name: "tap",
        icon: <LazyImage src={goat16} style={{ width: 24 }} />,
        scene: SceneNames.TAP,
        label: "Tap"
      },
      {
        name: "league",
        scene: SceneNames.LEADERBOARD,
        icon: <LeaderboardIcon style={{ width: 24, color: "white" }} />,
        label: "League"
      },
      {
        name: "boost",
        scene: SceneNames.BOOST,
        icon: <ElectricBoltIcon style={{ width: 24, color: "white" }} />,
        label: "Boost"
      },
      {
        name: "referral",
        scene: SceneNames.REFERRAL,
        icon: <GroupIcon style={{ width: 24, color: "white" }} />,
        label: "Referral"
      },
    ]
  }, []);

  return <Flex
    position={"fixed"}
    fullWidth
    bottom={0}
    height={BOTTOM_MENU_HEIGHT}
    overflow={"hidden"}
    maxWidth={MOBILE_SIZE}
    bgcolor={"#000000"}
    zIndex={1000}
    center
  >
    <Flex fullSize style={{
      position: "absolute",
      bottom: -70,
      pointerEvents: "none"
    }}>
      <Animates.WaveBg />
    </Flex>
    <Flex fullSize
      center
      style={{
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        WebkitBackdropFilter: "blur(1px)",
        backdropFilter: "blur(1px)",
      }}
    >
      <Grid container spacing={1} style={{ width: "100%" }}>
        {menuItems
          .map((item) => (
            <Grid key={item.name} item xs={3}>
              <Flex cursorPointer key={item.name}
                onClick={(e) => {
                  ScenesNavigator.navigate(item.scene, e)
                }}
                onTouchEnd={(e) => {
                  ScenesNavigator.navigate(item.scene, e)
                }}
              >
                <Flex column key={item.name} center p={1} mx={1}>
                  {item.icon}
                  <Text className={globalStyles.textOrbiBold12}
                    color={item.scene === gameStore.scene
                      ? Colors.textActive : Colors.white
                    }
                  >
                    {item.label}
                  </Text>
                </Flex>
              </Flex>
            </Grid>
          ))}
      </Grid>
    </Flex>
  </Flex>
})