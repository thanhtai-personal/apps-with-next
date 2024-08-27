import { GoatTapBackgroundImage } from "@/components/GoatTapBackgroundImage";
import { PickSquad } from "@/components/PickSquad";
import { observer } from "@core-ui/react-mobx-state";

const SquadContainer = observer(() => {
  return (<GoatTapBackgroundImage>
    <PickSquad />
  </GoatTapBackgroundImage>)
});

export default SquadContainer;
