import { useGlobalStyles } from "@/styles/globalStyle";
import { ModalId, SceneNames, useGoatTapStore, usePickGoat, useSceneNavigator } from "@core-ui/react-goat-tap";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, Text } from "@core-ui/react-mui-core";
import { IconButton } from "../IconButton";
import { useStore } from "@/store/index";

export const ModalConfirmGoat = observer(() => {
  const globalStyles = useGlobalStyles();
  const { pickGoatStore, gameStore } = useGoatTapStore();
  const { uiStore } = useStore();
  const navigate = useSceneNavigator();
  const { updateFamousPerson } = usePickGoat();

  return (
    <Flex fullWidth column center>
      <Text className={globalStyles.textCharka16} textAlign={"center"}>
        You want to choose <span style={{ fontWeight: 700, color: "blueviolet" }}>{pickGoatStore.selectedGoat?.name || ""}</span> as your Goat.
      </Text>
      <Text className={globalStyles.textCharka16} textAlign={"center"}>
        Confirm your choice.
      </Text>
      <Flex fullWidth center mt={1}>
        <IconButton icon={<div></div>} label={<Text className={globalStyles.textOrbi18}
          onClick={async () => {
            if (updateFamousPerson && pickGoatStore.selectedGoat) {
              await updateFamousPerson(pickGoatStore.selectedGoat.id);
              uiStore.useBottomMenu = true;
              gameStore.modalShowing = null;
              gameStore.famousPeopleFilter.name = "";
              navigate.navigate(SceneNames.TAP);
            }
          }}
        >
          Confirm
        </Text>} />
      </Flex>
    </Flex>
  )
})