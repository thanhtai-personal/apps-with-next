import { observer } from "@core-ui/react-mobx-state";
import { Colors, Flex, ListItems, Loading, Text } from "@core-ui/react-mui-core";
import clsx from "@core-ui/react-mui-core/clsx"
import { useGlobalStyles } from "@/styles/globalStyle";
import { ReactNode } from "react";
import { IUserResponse } from "@core-ui/goat-tap-types";
import { LoadMoreButtonWrapper } from "@core-ui/react-viewframe";

export const FriendList = observer(({
  data, total = 0, empty, loadMore
}
  : {
    loadMore?: {
      handler: () => void;
      loading: boolean;
    };
    data: IUserResponse[],
    empty?: ReactNode;
    total?: number;
  }) => {
  const globalStyles = useGlobalStyles();

  return (
    <Flex column className={clsx(globalStyles.borderTopBox)} fullWidth bgcolor={"#12161D"}>
      <Flex fullWidth column
        style={{
          overflowY: "auto"
        }}>
        {empty && data.length === 0 && empty}
        <ListItems
          items={data.map((item, index) => ({
            renderItem: (_item) => (
              <Flex fullWidth justifyContent={"space-between"} p={2}
                borderBottom={index < data.length - 1 ? "solid 1px #FFFFFF21" : "unset"}
                bgcolor={"transparent"}
              >
                <Flex centerY>
                  <Text className={globalStyles.textKanit16}
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    overflow={"hidden"}
                    maxWidth={150}
                    color={Colors.white}>
                    {index + 1}
                  </Text>
                  <Flex centerY ml={4}>
                    <Text className={globalStyles.textKanit16}
                      textOverflow={"ellipsis"}
                      whiteSpace={"nowrap"}
                      overflow={"hidden"}
                      color={Colors.white}
                    >{`${item.telegramInfo?.first_name || ""} ${item.telegramInfo?.last_name || ""}`}</Text>
                  </Flex>
                </Flex>
                <Flex centerY>
                  <Text className={globalStyles.textKanit16}
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    overflow={"hidden"}
                    color={Colors.white}
                  >@{item.telegramInfo?.username}</Text>
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