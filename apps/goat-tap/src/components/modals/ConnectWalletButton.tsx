import { useGlobalStyles } from "@/styles/globalStyle";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, LazyImage, Text } from "@core-ui/react-mui-core";
import walletImage from "@/assets/images/wallet.png";
import { ConnectionButton as TonConnectionButton } from "@core-ui/react-ton-connection";
export const ConnectWalletButton = observer(({
  open,
}: {
  open?: () => void
}) => {
  const globalStyles = useGlobalStyles();

  return (
    <>
      <Flex fullWidth center my={2}>
        <LazyImage src={walletImage} style={{ width: 160 }} />
      </Flex>
      <Text className={globalStyles.textOrbi24} mt={1}>Connect wallet</Text>
      <Flex cursorPointer onClick={open}>
        <TonConnectionButton />
      </Flex>
    </>
  )
})
