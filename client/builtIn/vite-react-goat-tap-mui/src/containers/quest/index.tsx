import { GoatTapBackgroundImage } from "@/components/GoatTapBackgroundImage";
import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";

const QuestContainer = observer(() => {
  return (<GoatTapBackgroundImage>
    <Flex fullWidth column></Flex>
  </GoatTapBackgroundImage>)
});

export default QuestContainer;
