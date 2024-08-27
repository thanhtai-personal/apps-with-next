import { Flex, LazyImage } from "@core-ui/react-mui-core"
import { MOBILE_SIZE } from "../utils"
// import { Animates } from "@core-ui/react-animates"
import { Animates, PolygonMask } from "@core-ui/react-animates"
import goat240 from "@/assets/images/goat-240-2d.png"
import "@core-ui/react-animates/dist/loadingIcon.style.css"
// import { useGlobalStyles } from "@/styles/globalStyle"
// import { useStore } from "../store"

export const LoadingPage = ({ isStrongPlatform }: {
  isStrongPlatform?: boolean;
}) => {
  // const globalStyle = useGlobalStyles();
  // const { uiStore } = useStore();

  return <Flex position={"fixed"} zIndex={99999999} width={"100vw"} height={"100vh"} bgcolor={"black"} center>
    <Flex center column fullSize maxWidth={MOBILE_SIZE} bgcolor={"transparent"}>
      {isStrongPlatform && <PolygonMask config={{
        image: goat240,
      }} />}
      <Flex column position={"absolute"} fullSize center>
        <Flex fullSize position={"relative"} center column>
          <LazyImage src={goat240} style={{ width: 240 }} />
          {/* {uiStore.loadingStatus && <Text className={globalStyle.textOrbi16} mb={1}>{
            uiStore.loadingStatus
          }</Text>} */}
          <Flex position={"relative"} center>
            {/* <Animates.LoadingIcon /> */}
            <Flex center position={"absolute"} fullWidth top={"5%"} fontSize={"0.7px"}>
              <Flex><Animates.PlasmaBall id={"plasma-1"} /></Flex>
              <Flex mx={1}><Animates.PlasmaBall id={"plasma-2"} /></Flex>
              <Flex><Animates.PlasmaBall id={"plasma-3"} /></Flex>
            </Flex>
          </Flex>
          <Flex center position={"absolute"} bottom={-80}>
            <Animates.GlowingBallAnim id={"ball-1"} width={16} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
}