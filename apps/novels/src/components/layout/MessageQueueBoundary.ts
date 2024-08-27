import { useGoatTapStore } from "@core-ui/react-goat-tap";
import { observer } from "@core-ui/react-mobx-state";
import { NotiStackInstance } from "@core-ui/react-mui-core";
import { ReactNode, useEffect } from "react"

export const MessageQueueBoundary = observer(({
  children,
}: {
  children: ReactNode
}) => {
  const { gameStore } = useGoatTapStore();

  useEffect(() => {
    const message = gameStore.messageQueue.shift();
    if (message) {
      NotiStackInstance.push({
        children: message.children,
        variant: message.variant as "success" | "error" | "info" | "warning"
      })
    }
  }, [gameStore.messageQueue?.[0]])

  return children;
})