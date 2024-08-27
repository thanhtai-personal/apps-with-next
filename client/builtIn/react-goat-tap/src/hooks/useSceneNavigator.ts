import { SceneNames, useGoatTapStore } from "../store";

export const useSceneNavigator = () => {
  const { gameStore } = useGoatTapStore();

  const navigate = (page?: SceneNames, e?: any) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (page) {
      gameStore.scene = page;
    }
  }

  return { navigate }
}