import { Flex, Text } from "@core-ui/react-mui-core"
import { useGlobalStyles } from "@/styles/globalStyle";
import { Colors } from "@/styles/colors";

export const Banner = () => {
  const globalStyles = useGlobalStyles();

  return (
    <Flex fullWidth column minHeight={250} px={2} justifyContent={"flex-end"}>
      <Text className={globalStyles.textOrbiBold40} color={Colors.white}
        style={{
          lineHeight: "56px"
        }}
      >
        Pick Squad
      </Text>
      <Text className={globalStyles.textKanit16} color={Colors.white}
        style={{ fontWeight: 350 }}
      >
        Pick your beauty goat
      </Text>
    </Flex>
  )
}