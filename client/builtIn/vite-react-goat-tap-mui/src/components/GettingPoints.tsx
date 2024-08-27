import { useGlobalStyles } from "@/styles/globalStyle";
import { useNavigate } from "@core-ui/react-core";
import { observer } from "@core-ui/react-mobx-state";
import { Colors, Flex, OutlinedButton, Text } from "@core-ui/react-mui-core";

export const GettingPoints = observer(() => {
  const globalStyles = useGlobalStyles();
  const navigate = useNavigate();

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
            navigate("/league")
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