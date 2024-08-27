import { observer } from "@core-ui/react-mobx-state";
import { Flex } from "@core-ui/react-mui-core";
import { ReactNode } from "react";

export const WebAppModal = observer(({ children }: {
  children: ReactNode
}) => {

  return (
    <Flex position={"fixed"}
      width={"100vw"}
      height={"100vh"}
      top={0}
      left={0}
      bgcolor={"transparent"}
    >
      <Flex fullSize center
        bgcolor={"transparent"}
      >
        <Flex fullSize maxWidth={390}
          bgcolor={"rgba(18, 22, 29, 0.4)"}
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          column
          justifyContent={"flex-end"}
        >
          <Flex fullWidth center column px={4} py={2} bgcolor={"#12140C"}
            style={{
              boxShadow: "0px -4px 0px #305AE8",
              borderRadius: "16px 16px 0px 0px"
            }}
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
})
