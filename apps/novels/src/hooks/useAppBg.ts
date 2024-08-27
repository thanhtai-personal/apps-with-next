import { useEffect } from "react";
import defaultImage from "@/assets/images/app-bg-1.png"
import { useGoatTapStore } from "@core-ui/react-goat-tap";

export const useAppBg = (bgImage: string) => {
  const { gameStore } = useGoatTapStore();

  useEffect(() => {
    gameStore.pageBg = bgImage;
    return () => {
      gameStore.pageBg = defaultImage;
    }
  }, [])
}