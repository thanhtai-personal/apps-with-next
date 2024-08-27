import { Colors } from "@/styles/colors";
import { useGlobalStyles } from "@/styles/globalStyle";
import { observer } from "@core-ui/react-mobx-state";
import { AppTheme, Flex, Text } from "@core-ui/react-mui-core";
import clsx from "@core-ui/react-mui-core/clsx";
import { makeStyles, createStyles } from "@core-ui/react-mui-core/style";
import supperCharge from "@/assets/images/super-charge.png"
import megaCharge from "@/assets/images/mega-charge-48.png"
import autoBoot from "@/assets/images/auto-boot.png"
import leftArrow from "@/assets/icons/left-arrow.svg"
import lockIcon from "@/assets/icons/lock.svg"
import coin16 from "@/assets/images/coin16.png"
import { useMemo } from "react";
import { useStore } from "@/providers/GoatTapProvider";
import { ModalId } from "@/store/RevampGameStore";
import { formatNumberWithCommas } from "@core-utils/utils-helpers";
import { Link } from "@core-ui/react-core";

export const Boosters = observer(() => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const { gameStore } = useStore();

  const boosterItems = useMemo(() => (
    [
      {
        name: "supperCharge",
        image: supperCharge,
        title: "Super Charge",
        level: 0,
        gold: 200,
        onChangeScene: () => {
          gameStore.modalShowing = ModalId.superCharge
        }
      },
      {
        name: "megaCharge",
        image: megaCharge,
        title: "Mega Charge",
        level: 0,
        gold: 500,
        onChangeScene: () => {
          gameStore.modalShowing = ModalId.megaCharge
        }
      },
      {
        name: "autoBoot",
        image: autoBoot,
        title: "Auto Boot",
        level: "Fish league",
        gold: 50000,
        url: "/squad-detail"
      }
    ]
  ), [])

  return <Flex fullWidth column mx={2}>
    <Flex fullWidth >
      <Text className={clsx(globalStyles.textKanit16)} color={Colors.white}>
        Booster
      </Text>
    </Flex>
    <Flex column className={styles.contentWrapper} fullWidth mt={1}>
      {boosterItems.map((item, index) => {
        const content = (
          <Flex cursorPointer={!!item.url} fullWidth centerY justifyContent={"space-between"}
            py={2}
            style={{
              borderBottom: index === boosterItems.length - 1 ? "none"
                : "1px solid rgba(255,255,255, 0.1)"
            }}
          >
            <Flex centerY>
              <Flex mr={1}>
                <img src={item.image} style={{ height: "100%" }} />
              </Flex>
              <Flex column>
                <Text className={globalStyles.textKanitBold14}>
                  {item.title}
                </Text>
                <Flex centerY mt={1}>
                  <Flex centerY>
                    <img src={lockIcon} style={{ width: 16, height: 16 }} />
                    <Text ml={0.5}
                      className={globalStyles.textKanit14}>{`${item.level}${typeof item.level === "number" ? " lvl ." : " ."
                        }`}</Text>
                  </Flex>
                  <Flex centerY ml={0.5}>
                    <img src={coin16} style={{ width: 16, height: 16 }} />
                    <Text ml={0.5} className={globalStyles.textKanit14}>{`${formatNumberWithCommas(item.gold)}`}</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            {item.onChangeScene && <Flex cursorPointer
              onClick={item.onChangeScene}
            >
              <img src={leftArrow} style={{ width: 24 }} />
            </Flex>}
          </Flex>
        )
        if (item.url) {
          return (
            <Link to={item.url}>
              {content}
            </Link>
          )
        }
        return content;
      })}
    </Flex>
  </Flex>
})

const useStyles = makeStyles((_theme: AppTheme) =>
  createStyles({
    contentWrapper: {
      background: "rgba(18, 22, 29, 0.6)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderRadius: "16px",
      padding: "16px"
    }
  })
)