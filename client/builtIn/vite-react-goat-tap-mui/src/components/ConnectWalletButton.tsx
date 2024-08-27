import { useGlobalStyles } from "@/styles/globalStyle";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text } from "@core-ui/react-mui-core";
import walletImage from "@/assets/images/wallet.png";
import { Button } from "@core-ui/react-mui-core/materials";
import { Colors } from "@/styles/colors";
import { Link } from "@core-ui/react-core";

export const ConnectWalletButton = observer(() => {
  const globalStyles = useGlobalStyles();

  return (
    <>
      <Flex fullWidth center my={2}>
        <img src={walletImage} style={{ width: 160 }} />
      </Flex>
      <Text className={globalStyles.textOrbi24} mt={1}>Connect wallet</Text>
      <Link to={"/league"}>
        <Button
          // onClick={() => {
          //   navigate("/league");
          // }}
          style={{
            background: Colors.white,
            borderRadius: 80,
            width: "100%",
            textAlign: "center",
            marginTop: "32px",
            padding: "16px 40px",
          }}>
          <Text
            className={globalStyles.textKanitBold16}
            color={"#1B1D21"}
          >Connect Ton Wallet</Text>
        </Button>
      </Link>
    </>
  )
})
