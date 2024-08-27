import { ReactNode } from "react";
import { observer } from "@core-ui/react-mobx-state";
import { GoatTapBackground } from "./GoatTapBackground"

export const GoatTapLayout = observer(({ children }: { children: ReactNode }) => {
  return <GoatTapBackground>
    <>
      {children}
    </>
  </GoatTapBackground>
})