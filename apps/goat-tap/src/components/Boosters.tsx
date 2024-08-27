import { Colors } from "@/styles/colors";
import { useGlobalStyles } from "@/styles/globalStyle";
import { observer } from "@core-ui/react-mobx-state";
import { AppTheme, Flex, LazyImage, Text } from "@core-ui/react-mui-core";
import clsx from "@core-ui/react-mui-core/clsx";
import { makeStyles, createStyles } from "@core-ui/react-mui-core/style";
import supperCharge from "@/assets/images/super-charge.png"
import megaCharge from "@/assets/images/mega-charge-48.png"
import autoBoot from "@/assets/images/auto-boot.png"
import leftArrow from "@/assets/icons/left-arrow.svg"
import lockIcon from "@/assets/icons/lock.svg"
import coin16 from "@/assets/images/coin16.png"
import goat16 from "@/assets/images/goat-32.png"
import { useMemo } from "react";
import { formatFullDate, formatNumberWithCommas } from "@core-utils/utils-helpers";
import { Link } from "@core-ui/react-core";
import { ModalId, useGoatTapStore } from "@core-ui/react-goat-tap";
import { BoostType } from "@core-ui/react-goat-tap";

export const Boosters = observer(({
}: {
  }) => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const { boostStore, gameStore, accountStore } = useGoatTapStore();
  const boosterItems = useMemo(() => boostStore.boostItems.map((item) => {
    return (
      {
        ...item,
        name: item.name,
        image: item.image || (item.type === BoostType.SuperCharge ? supperCharge
          : item.type === BoostType.MegaCharge ? megaCharge
            : autoBoot),
        title: item.title,
        level: item.level,
        price: Number(item.tonPrice) || Number(item.goatPrice),
        tonPrice: Number(item.tonPrice),
        pointsPerTap: Number(item.pointsPerTap),
        nextLevelPointsPerTap: Number(item.nextLevelPointsPerTap),
        onChangeScene: item.type !== BoostType.AutoBoot ? (async () => { }) : null,
        onClick: (async () => {
          switch (item.type) {
            case BoostType.MegaCharge:
              gameStore.modalShowing = ModalId.megaCharge
              break;
            case BoostType.SuperCharge:
              gameStore.modalShowing = ModalId.superCharge
              break;
            case BoostType.AutoBoot:
              gameStore.modalShowing = ModalId.confirmAutoBoost;
              break;
            default:
              return;
          }
        }),
      })
  }
  ), [boostStore.boostItems])

  return <Flex fullWidth column mx={2}>
    <Flex fullWidth >
      <Text className={clsx(globalStyles.textKanit16)} color={Colors.white}>
        Booster
      </Text>
    </Flex>
    <Flex column className={styles.contentWrapper} fullWidth mt={1}>
      {boosterItems.map((item, index) => {
        const content = (
          <Flex cursorPointer={!!item.url || !!item.onClick} fullWidth centerY justifyContent={"space-between"}
            py={2} onClick={Number(accountStore.account?.points) > Number(item.price) || item.type === BoostType.AutoBoot
              ? item.onClick
              : () => {
                gameStore.messageQueue.push({
                  children: "Not enough balance!",
                  variant: "warning"
                })
              }}
            style={{
              borderBottom: index === boosterItems.length - 1 ? "none"
                : "1px solid rgba(255,255,255, 0.1)"
            }}
          >
            <Flex centerY>
              <Flex mr={1}>
                <LazyImage src={item.image} style={{ height: "100%" }} />
              </Flex>
              <Flex column>
                <Flex centerY>
                  <Text className={globalStyles.textKanitBold14}>
                    {item.title}
                  </Text>
                </Flex>
                <Flex centerY mt={1}>
                  {item.type === BoostType.AutoBoot ? <Flex centerY>
                    <LazyImage src={lockIcon} style={{ width: 16, height: 16 }} />
                    <Text ml={0.5}
                      className={globalStyles.textKanit14}
                      whiteSpace={"nowrap"}
                    >
                      12 hours.
                    </Text>
                  </Flex> : <Flex centerY>
                    <LazyImage src={lockIcon} style={{ width: 16, height: 16 }} />
                    <Text ml={0.5}
                      className={globalStyles.textKanit14}
                      whiteSpace={"nowrap"}
                    >{`${item.level}${typeof item.level === "number" ? " lvl ." : " ."
                      }`}</Text>
                  </Flex>}
                  <Flex centerY ml={0.5}>
                    <LazyImage src={item.tonPrice ? coin16 : goat16} style={{ width: 16, height: 16 }} />
                    <Text ml={0.5} className={globalStyles.textKanit14}
                      whiteSpace={"nowrap"}
                    >{`${formatNumberWithCommas(item.price || 0)}`}</Text>
                  </Flex>
                </Flex>
                {item.type === BoostType.AutoBoot && item.expiredAt && new Date(item.expiredAt) > new Date() && <Flex centerY mt={1}>
                  <Text className={globalStyles.textKanit12} fontStyle={"italic"}
                    textAlign="start"
                  >
                    {`Your bot is running and will be ended at `}
                    <span style={{
                      fontWeight: 600,
                      color: "orangered"
                    }}
                    >
                      {formatFullDate(new Date(item.expiredAt))}
                    </span>
                  </Text>
                </Flex>
                }
              </Flex>
            </Flex>
            {item.onChangeScene && <Flex cursorPointer={!(Number(accountStore.account?.points) < Number(item.price))}>
              <LazyImage src={leftArrow} className={`lazy ${Number(accountStore.account?.points) < Number(item.price) ? 'disabled' : ''
                }`}
                style={{ width: 24 }} />
            </Flex>}
          </Flex>
        )
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