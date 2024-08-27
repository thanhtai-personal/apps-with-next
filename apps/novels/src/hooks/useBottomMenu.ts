import { useEffect } from "react"
import { useStore } from "../store"
import { useGoatTapStore } from "@core-ui/react-goat-tap";

export const useBottomMenu = () => {
  const { uiStore } = useStore();
  const { gameStore } = useGoatTapStore();

  useEffect(() => {
    uiStore.useBottomMenu = true;

    return () => {
      uiStore.useBottomMenu = false;
    }
  }, [])

  useEffect(() => {
    if (!gameStore.modalShowing) {
      uiStore.useBottomMenu = true;
    }
  }, [gameStore.modalShowing])
}