import { observer } from "@core-ui/react-mobx-state";
import { LeaderBoardValueButton } from "@/components/LeaderBoardValueBtn";
import { useGlobalStyles } from "@/styles/globalStyle";
import { PercentColumn, Flex, Text, LazyImage } from "@core-ui/react-mui-core";
import { Colors } from "@/styles/colors";
import { GoatBalance } from "@/components/GoatBalance";
import { MIN_CONTENT_HEIGHT } from "@/utils/constants";
import goat240 from "@/assets/images/goat-240-2d.png"
import goatCoin from "@/assets/images/goat-coin.png"
import lightning from "@/assets/images/lightning.png"
import bgImage2 from "@/assets/images/app-bg-2.png"
import { useAppBg } from "@/hooks/useAppBg";
import { runTap, useDeviceDetection, useGoatTapStore, useTap } from "@core-ui/react-goat-tap";
import { useMemo } from "react";
import { Animates } from "@core-ui/react-animates";
import "@core-ui/react-animates/dist/ImageTappingAnimation.style.css"
import { useBottomMenu } from "@/hooks/useBottomMenu";

const TapContainer = observer(() => {
  const globalStyles = useGlobalStyles();
  useAppBg(bgImage2);
  const { accountStore, tapStore } = useGoatTapStore();
  const { tap, increasePoints } = useTap(import.meta.env.VITE_TELEGRAM_BOT_WALLET_ADDRESS);
  const energy = useMemo(() => Number(accountStore.account?.energy || 0) + tapStore.unsyncEnergy, [accountStore.account?.energy, tapStore.unsyncEnergy])
  const points = useMemo(() => Number(accountStore.account?.points || 0) + tapStore.unsyncPoints
    , [accountStore.account?.points, tapStore.unsyncPoints])
  const { isIOS, isAndroid } = useDeviceDetection();
  const isTextInside = energy < 500 || energy > 2000;

  useBottomMenu();
  runTap(import.meta.env.VITE_TELEGRAM_BOT_WALLET_ADDRESS);
  
  return (
    <Flex fullWidth column>
      <Flex column fullWidth pb={1} position={"relative"}
        height={MIN_CONTENT_HEIGHT}
        justifyContent={"space-between"}
      >
        <Flex fullWidth column>
          <Flex center bgcolor={"transparent"}
            style={{
              transform: "translateY(8px)"
            }}
          >
            <Text className={globalStyles.textOrbi12} color={Colors.white}>
              Pick Goat
            </Text>
          </Flex >
          <Flex fullWidth px={2} center column>
            <LeaderBoardValueButton />
          </Flex>
          <GoatBalance value={points || 0} mt={2} />
        </Flex>

        <Flex fullWidth column>
          <Flex center fullWidth mt={4}>
            <Animates.ImageTappingAnimation
              onTap={() => {
                if (energy > 0) {
                  tap();
                }
              }}
              isMobile={isIOS || isAndroid}
              contentImage={goat240}
              animationContent={<Flex center flexWrap={"nowrap"}>
                <Text
                  className={globalStyles.textGeoBold24}
                  whiteSpace={"nowrap"}
                  color={increasePoints <= 0 ? Colors.red : Colors.green}
                >
                  + {increasePoints}
                </Text>
                <LazyImage src={goatCoin} style={{ width: 28 }} />
              </Flex>}
            />
          </Flex>
        </Flex>

        <Flex column fullWidth>
          {(isTextInside) && <Flex center fullWidth mt={1}>
            <Text className={globalStyles.textKanitBold12} color={Colors.white}>Energy: {energy} / 2500</Text>
          </Flex>}
          <Flex center fullWidth mt={(isTextInside) ? 0 : 1} pl={8} pr={4}>
            <PercentColumn
              percents={energy ? [
                energy / 2500 * 100,
                100 - (energy / 2500 * 100)
              ] : [0, 100]}
              colors={["transparent", "#333840"]}
              styles={[{ background: 'linear-gradient(91.27deg, #305AE8 0%, #FFFFFF 100%)', height: "100%" }
                , { height: "100%" }
              ]}
              contents={[
                {
                  justifyContent: "flex-end",
                  element: <Text whiteSpace={"nowrap"} className={globalStyles.textKanit12} color={"#222933"}>{isTextInside ? "" : `Energy: ${energy}`}&nbsp;</Text>,
                },
                {
                  element: <Text whiteSpace={"nowrap"} className={globalStyles.textKanit12} color={Colors.white}>{isTextInside ? "" : "/ 2500"}</Text>
                },
              ]}
              style={{ height: 24, width: "100%", borderRadius: "16px" }}
            />
          </Flex>
        </Flex>

        <Flex position={"absolute"} left={8} bottom={0}>
          <LazyImage src={lightning} style={{ width: 48 }} />
        </Flex>
      </Flex>
    </Flex>
  )
});

export default TapContainer;
