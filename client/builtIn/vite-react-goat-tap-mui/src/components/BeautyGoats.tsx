import { Flex, Text } from "@core-ui/react-mui-core"
import { Grid } from "@core-ui/react-mui-core/materials"
import { useGlobalStyles } from "@/styles/globalStyle"
import diamonGoat from "@/assets/images/diamon-goat.png"
import pinkGoat from "@/assets/images/pink-goat.png"
import blueGoat from "@/assets/images/blue-goat.png"
import redGoat from "@/assets/images/red-goat.png"
import diamonPinkGoat from "@/assets/images/diamon-pink-goat.png"
import purpleGoat from "@/assets/images/purple-goat.png"
import { Colors } from "@/styles/colors"

const beautyGoats = [
  {
    src: diamonGoat,
    id: "diamon-goats",
    label: "DiamonGoat.eth",
  }, {
    src: pinkGoat,
    id: "pink-goats",
    label: "DiamonGoat.eth",
  }, {
    src: blueGoat,
    id: "blue-goats",
    label: "DiamonGoat.eth",
  }, {
    src: redGoat,
    id: "red-goats",
    label: "DiamonGoat.eth",
  }, {
    src: diamonPinkGoat,
    id: "diamon-pink-goats",
    label: "DiamonGoat.eth",
  }, {
    src: purpleGoat,
    id: "purple-goats",
    label: "DiamonGoat.eth",
  }
]

const BeautyItem = ({ item, onClick }: { item: any; onClick: () => void; }) => {
  const globalStyles = useGlobalStyles();
  return (
    <Flex column center fullSize
      cursorPointer
      bgcolor={"rgba(18, 22, 29, 0.6)"}
      borderRadius={"16px"}
      p={6}
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      onClick={() => {
        onClick();
      }}
    >
      <img src={item.src} style={{ height: 56 }} />
      <Text color={Colors.white} className={globalStyles.textKanit16}>
        {item.label}
      </Text>
    </Flex>
  )
}

export const BeautyGoats = ({ onClickItem }: { onClickItem: () => void; }) => {

  return (
    <Flex fullWidth column mx={2} justifyContent={"flex-start"}>
      <Grid container spacing={1}>
        {beautyGoats.map((item) => (
          <Grid key={item.id} item xs={6}>
            <BeautyItem item={item} onClick={onClickItem} />
          </Grid>
        ))}
      </Grid>
    </Flex>
  )
}