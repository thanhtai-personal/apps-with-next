import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import { ReactNode, useEffect } from "react";
import { FadeUpDownAppear } from "@core-ui/react-animates";
import { useDeviceDetection, useGoatTapStore } from "@core-ui/react-goat-tap";
import { useStore } from "@/store/index";
import { MOBILE_SIZE } from "@/utils/constants";

export const WebAppModal = observer(({ children, opened, outSideClick }: {
  children: ReactNode;
  opened?: boolean;
  outSideClick?: () => void;
}) => {
  const { gameStore } = useGoatTapStore();
  const { uiStore } = useStore();
  const { isIOS } = useDeviceDetection();

  useEffect(() => {
    if (opened) {
      uiStore.useBottomMenu = false;
    } else {
      uiStore.useBottomMenu = true;
    }
  }, [opened])

  return (
    <Flex position={isIOS ? "fixed" : "absolute"}
      width={"100%"}
      height={opened ? `100vh` : 0}
      bottom={0}
      left={0}
      bgcolor={"transparent"}
      onClick={() => {
        gameStore.modalShowing = null;
        outSideClick && outSideClick();
      }}
      center
    >
      <Flex fullSize center
        bgcolor={"transparent"}
      >
        <Flex fullSize maxWidth={MOBILE_SIZE}
          id="modal-container"
          bgcolor={"rgba(18, 22, 29, 0.4)"}
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)"
          }}
          column
          justifyContent={"flex-end"}
        >
          <FadeUpDownAppear style={{
            width: "100%",
            maxWidth: MOBILE_SIZE,
          }}
            isVisible={opened}
          >
            <Flex fullWidth center column px={4} py={2} bgcolor={"#12140C"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              style={{
                boxShadow: "0px -4px 0px #305AE8",
                borderRadius: "16px 16px 0px 0px"
              }}
            >
              {children}
            </Flex>
          </FadeUpDownAppear>
        </Flex>
      </Flex>
    </Flex>
  )
})
