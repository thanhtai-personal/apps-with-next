import { Colors } from "@/styles/colors";
import { useGlobalStyles } from "@/styles/globalStyle";
import { Animates } from "@core-ui/react-animates";
import { Flex, LazyImage, Text } from "@core-ui/react-mui-core";
import { observer } from "@core-ui/react-mobx-state";
import "@core-ui/react-animates/dist/BubbleWrapper.style.css"

export const BeautyItem = observer(({ item, onClick, defaultImage }: { item: any; onClick: () => void; defaultImage?: string; }) => {
  const globalStyles = useGlobalStyles();

  return (
    <Flex column center fullSize
      cursorPointer
      p={2}
      onClick={() => {
        onClick();
      }}
    >
      <Animates.BubbleWrapper id={item.name} style={{ pointerEvents: "none" }}>
        <Flex column center fullSize>
          <LazyImage src={item.image || defaultImage} style={{ height: 56, borderRadius: "100%" }}/>
        </Flex>
      </Animates.BubbleWrapper>
      <Text style={{ width: "100%" }} mt={0.5} textAlign={"center"} color={Colors.white} className={globalStyles.textKanit16}
        whiteSpace={"nowrap"} textOverflow={"ellipsis"}
      >
        {item.name}
      </Text>
    </Flex>
  )
})