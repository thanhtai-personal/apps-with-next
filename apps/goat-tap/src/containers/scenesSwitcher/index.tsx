import { Scenes } from "@/appRoute/singleRoutes";
import { PageLayout } from "@/components/layout/PageLayout";
import { LoadingPage } from "@/components/LoadingPage";
import { useStore } from "@/store/index";
import { PageSlide } from "@core-ui/react-animates";
import { useDeviceDetection, useGoatTapStore } from "@core-ui/react-goat-tap"
import { observer } from "@core-ui/react-mobx-state"
import { useMemo } from "react";

const ScenesSwitcher = observer(() => {
  const { gameStore } = useGoatTapStore();
  const { uiStore } = useStore();
  const { isIOS } = useDeviceDetection();

  const sceneElement = useMemo(() => {
    if (Scenes[gameStore.scene]) {
      const SceneComponent = Scenes[gameStore.scene]
      return <PageSlide
        key={gameStore.scene}
        wrapperStyle={{
          width: "100%",
          bgcolor: "#000",
          paddingBottom: uiStore.useBottomMenu && isIOS ? "96px" : "unset"
        }}
        style={{
          width: "100%",
        }}
      >
        <SceneComponent />
      </PageSlide>
    }
    return null;
  }, [gameStore.scene])

  if (uiStore.pageLoading) {
    return <LoadingPage />
  }

  return <PageLayout>
    {sceneElement || <LoadingPage />}
  </PageLayout>
})

export default ScenesSwitcher