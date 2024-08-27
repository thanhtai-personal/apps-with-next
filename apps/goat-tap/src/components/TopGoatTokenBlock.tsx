import { observer } from "@core-ui/react-mobx-state";
import { Colors, Flex, ListItems, Loading, Text } from "@core-ui/react-mui-core";
import clsx from "@core-ui/react-mui-core/clsx"
import { useGlobalStyles } from "@/styles/globalStyle";
import { formatNumberWithCommas, formatTokenNumberAsString } from "@core-utils/utils-helpers";
import { ReactNode } from "react";
import { IFamousPerson } from "@core-ui/goat-tap-types";
import { LoadMoreButtonWrapper } from "@core-ui/react-viewframe";

export const TopGoatTokenBlock = observer(({
  noTitle, data, noActiveFirst, total = 0,
  noTokenAddress, textNormal, empty,
  noRanking, rankStartNumber = 1, loadMore
}
  : {
    loadMore?: {
      handler: () => void;
      loading: boolean;
    };
    noActiveFirst?: boolean;
    noTitle?: boolean;
    noRanking?: boolean;
    data: IFamousPerson[],
    noTokenAddress?: boolean;
    textNormal?: boolean;
    empty?: ReactNode;
    rankStartNumber?: number;
    total?: number;
  }) => {
  const globalStyles = useGlobalStyles();

  return (
    <Flex column className={clsx(globalStyles.borderTopBox)} fullWidth bgcolor={"#12161D"}>
      {!noTitle && <Flex fullWidth center p={1} pt={3}>
        <Text color={"#5E7EED"} style={{
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: "28px",
        }}>
          All Time
        </Text>
      </Flex>}

      <Flex fullWidth column center
        style={{
          overflowY: "auto"
        }}>
        {empty && data.length === 0 && empty}
        <ListItems
          items={data.map((item, index) => ({
            renderItem: (_item) => (
              <Flex fullWidth justifyContent={"space-between"} p={2}
                borderBottom={index < data.length - 1 ? "solid 1px #FFFFFF21" : "unset"}
                bgcolor={index === 0 && !noActiveFirst ? "#DEECFF" : "transparent"}
              >
                <Flex fullHeight>
                  <Flex fullHeight width={40}>
                    <Flex centerY>
                      <Text className={textNormal ? globalStyles.textKanit16 : globalStyles.textKanitBold16}
                        color={index === 0 && !noActiveFirst ? "#222933" : Colors.white}
                      >{index + rankStartNumber}</Text>
                      {index === 0 && !noRanking && "🤴"}
                    </Flex>
                  </Flex>
                  <Flex column>
                    <Text className={textNormal ? globalStyles.textKanit16 : globalStyles.textKanitBold16}
                      textOverflow={"ellipsis"}
                      whiteSpace={"nowrap"}
                      overflow={"hidden"}
                      maxWidth={150}
                      color={index === 0 && !noActiveFirst ? "#1263FF" : Colors.white}
                    >{item.name}</Text>
                    {!noTokenAddress && <Text className={globalStyles.textKanit16} textOverflow={"ellipsis"}
                      style={{
                        maxWidth: 135,
                        overflow: "hidden",
                      }}
                      color={index === 0 && !noActiveFirst ? "#222933" : Colors.white}
                    >{item.project}</Text>}
                  </Flex>
                </Flex>
                <Flex fullHeight>
                  <Text className={textNormal ? globalStyles.textKanit16 : globalStyles.textKanitBold16}
                    color={index === 0 && !noActiveFirst ? "#222933" : Colors.white}
                  >{index === 0 && !noActiveFirst ? formatTokenNumberAsString(item.groupPoints || 0, 2) : formatNumberWithCommas(item.groupPoints || 0)}&nbsp;GT</Text>
                </Flex>
              </Flex>
            )
          }))}
        />
        {data.length > 0 && data.length < total && loadMore && <LoadMoreButtonWrapper
          onScrollIntoView={loadMore.handler}
        >
          {loadMore.loading && <Flex mb={1} fullWidth center><Loading size={16} /></Flex>}
        </LoadMoreButtonWrapper>}
      </Flex>
    </Flex>
  )
})