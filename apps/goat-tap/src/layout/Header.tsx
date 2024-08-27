import { MOBILE_SIZE } from "@/utils/constants"
import { Colors, Flex, Text } from "@core-ui/react-mui-core"
import { Button } from "@core-ui/react-mui-core/materials"

export const Header = () => {

  return <Flex fullWidth center column justifyContent={"flex-end"}
  >
    <Flex fullWidth maxWidth={MOBILE_SIZE} bgcolor={"#000000"} justifyContent={"space-between"}>
      <Flex fullWidth bgcolor={"#1C1C1E"} justifyContent={"center"}
        py={2}
        mt={2}
        position={"relative"}
        style={{
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}>
        <Button
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            pt: 2,
            color: "#0A84FF"
          }}
          onClick={() => {
            window.close();
          }}
        >Cancel</Button>
        <Text color={Colors.white}
          textAlign={"center"}
          style={{
            fontFamily: 'SF Pro Text',
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "17px",
          }}
        >
          DCT Goat
        </Text>
        <Flex>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
}