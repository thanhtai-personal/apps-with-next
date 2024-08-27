import { useGlobalStyles } from "@/styles/globalStyle";
import { observer } from "@core-ui/react-mobx-state";
import { Colors, Flex, LazyImage, OutlinedButton, Text } from "@core-ui/react-mui-core";
import goatToken80 from "@/assets/images/goat-coins-105.png"
import { SceneNames, useSceneNavigator } from "@core-ui/react-goat-tap";

export const GettingPoints = observer(() => {
  const globalStyles = useGlobalStyles();
  const navigate = useSceneNavigator();

  return (
    <Flex fullWidth column>
      <Flex fullWidth center my={2}>
        <LazyImage src={goatToken80} style={{ height: 80 }} />
      </Flex>
      <Text className={globalStyles.textOrbi24} textAlign={"center"}>
        Enter Ethereum wallet to get points
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
          <input placeholder="Enter address"
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
            navigate.navigate(SceneNames.BOOST)
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