import { observer } from "@core-ui/react-mobx-state";
import { Flex, OutlinedButton, Text } from "@core-ui/react-mui-core";
import megaCharge80 from "@/assets/images/mega-charge-80.png"
import { useGlobalStyles } from "@/styles/globalStyle";
import { Colors } from "@/styles/colors";
import { useNavigate } from "@core-ui/react-core";

export const BoostSuccess = observer(() => {
  const globalStyles = useGlobalStyles();
  const navigate = useNavigate();

  return (
    <Flex fullWidth column center>
      <Flex fullWidth center mt={2}>
        <img src={megaCharge80} />
      </Flex>
      <Text textAlign={"center"} className={globalStyles.textOrbi24} mt={2}>
        Boost Successfull
      </Text>
      <Flex fullWidth my={2} mt={1}>
        <OutlinedButton
          style={{
            background: "transparent",
            borderRadius: "80px",
            width: "100%",
            border: "1px solid #5E7EED",
          }}
          onClick={() => {
            navigate("/boost");
          }}
        >
          <Text color={Colors.white} className={globalStyles.textKanitBold16}>
            Got it
          </Text>
        </OutlinedButton>
      </Flex>
    </Flex>
  )
})