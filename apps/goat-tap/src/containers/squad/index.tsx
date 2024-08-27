import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import { Banner } from "@/components/Banner";

const SquadContainer = observer(() => {
  return (<Flex column fullWidth py={2} position={"relative"}>
    <Banner />
    <Flex fullWidth mt={4}>
      {/* <BeautyGoats onClickItem={(_item: any) => {
      }} /> */}
    </Flex>
  </Flex>)
});

export default SquadContainer;
