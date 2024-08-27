import { ModalId } from "@/store/RevampGameStore";

import { useGlobalStyles } from "@/styles/globalStyle";
import { observer } from "@core-ui/react-mobx-state";
import { Colors, Flex, OutlinedButton, Text } from "@core-ui/react-mui-core";
import { useStore } from "@/providers/GoatTapProvider";

export const SearchKOL = observer(() => {
  const globalStyles = useGlobalStyles();
  const { gameStore } = useStore();

  return (
    <Flex fullWidth column>
      <Flex fullWidth my={2} mt={1}>
        <OutlinedButton
          style={{
            border: "none",
            background: Colors.white,
            borderRadius: "40px",
            width: "100%"
          }}
          onClick={() => {
            gameStore.modalShowing = ModalId.searchResult
          }}
        >
          <Text color={"#1B1D21"} className={globalStyles.textKanitBold16}>
            Confirm
          </Text>
        </OutlinedButton>
      </Flex>
    </Flex>
  )
})