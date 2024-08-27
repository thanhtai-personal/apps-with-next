import { useGlobalStyles } from "@/styles/globalStyle";
import { observer } from "@core-ui/react-mobx-state";
import { Colors, Flex, LazyImage, OutlinedButton, Text } from "@core-ui/react-mui-core";
import goatToken80 from "@/assets/images/goat-80.png"
import { useRef } from "react";
import { useStore } from "../../store";
import { SceneNames, useGoatTapStore, useSceneNavigator } from "@core-ui/react-goat-tap";

export const SearchKOL = observer(() => {
  const globalStyles = useGlobalStyles();
  const { uiStore } = useStore();
  const { gameStore } = useGoatTapStore();
  const navigate = useSceneNavigator();
  const inputRef = useRef<any>();

  return (
    <Flex fullWidth column>
      <Flex fullWidth center my={2}>
        <LazyImage src={goatToken80} style={{ height: 80 }} />
      </Flex>
      <Text className={globalStyles.textOrbi24} textAlign={"center"}>
        Search Famous People
      </Text>
      <Flex fullWidth mt={2}>
        <Flex fullWidth p={1} px={2}
          style={{
            background: "linear-gradient(90deg, #EACDA3 0%, #D6AE7B 100%)",
            border: "1px solid #FFE5BB",
            boxShadow: "0px 0px 16px rgba(255, 187, 77, 0.9)",
            borderRadius: "48px",
          }}
        >
          <input placeholder="Enter name or handle..."
            ref={inputRef}
            style={{
              color: "#222933",
              background: "transparent",
              border: "none",
              outline: "none",
              width: "100%",
            }}
          />
        </Flex>
      </Flex>
      <Flex fullWidth my={2} mt={1}>
        <OutlinedButton
          style={{
            border: "none",
            background: Colors.white,
            borderRadius: "40px",
            width: "100%"
          }}
          onClick={() => {
            uiStore.pageLoading = true;
            gameStore.famousPeopleFilter.name = inputRef.current.value;
            navigate.navigate(SceneNames.SEARCH);
          }}
        >
          <Text color={"#1B1D21"} className={globalStyles.textKanitBold16}>
            Search
          </Text>
        </OutlinedButton>
      </Flex>
    </Flex>
  )
})