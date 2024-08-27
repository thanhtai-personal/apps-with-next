import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import { Navigator } from "./Navigator";

export const SquadDetail = observer(() => {

  return (
    <Flex fullWidth column>
      <Navigator back={"/boost"} />
      <Flex fullWidth column></Flex>
      <Flex fullWidth column></Flex>
      <Flex fullWidth column></Flex>
    </Flex>
  )
})