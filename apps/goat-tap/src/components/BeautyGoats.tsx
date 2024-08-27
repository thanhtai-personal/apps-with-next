import { Flex, Text } from "@core-ui/react-mui-core"
import { Grid } from "@core-ui/react-mui-core/materials"
import diamonGoat from "@/assets/images/diamon-goat.png"
import pinkGoat from "@/assets/images/pink-goat.png"
import blueGoat from "@/assets/images/blue-goat.png"
import redGoat from "@/assets/images/red-goat.png"
import diamonPinkGoat from "@/assets/images/diamon-pink-goat.png"
import purpleGoat from "@/assets/images/purple-goat.png"
import { useGoatTapStore } from "@core-ui/react-goat-tap"
import { observer } from "@core-ui/react-mobx-state"
import { BeautyItem } from "./BeautyItem"

const listGoatDefaultImages = [
  diamonGoat,
  diamonPinkGoat,
  pinkGoat,
  blueGoat,
  redGoat,
  purpleGoat
]

const beautyGoats = [
  {
    image: listGoatDefaultImages[0],
    id: "diamon-goats",
    name: "DiamonGoat.eth",
  }, {
    image: listGoatDefaultImages[1],
    id: "pink-goats",
    name: "DiamonGoat.eth",
  }, {
    image: listGoatDefaultImages[2],
    id: "blue-goats",
    name: "DiamonGoat.eth",
  }, {
    image: listGoatDefaultImages[3],
    id: "red-goats",
    name: "DiamonGoat.eth",
  }, {
    image: listGoatDefaultImages[4],
    id: "diamon-pink-goats",
    name: "DiamonGoat.eth",
  }, {
    image: listGoatDefaultImages[5],
    id: "purple-goats",
    name: "DiamonGoat.eth",
  }
]

export const BeautyGoats = observer(({ onClickItem, famousPeople, filter }: {
  onClickItem: (item: any) => Promise<void>;
  famousPeople?: boolean;
  filter?: any;
}) => {
  const { gameStore } = useGoatTapStore();

  return (
    <Flex fullWidth column px={2} justifyContent={"flex-start"}>
      <Grid container spacing={1} style={{ width: "100%" }}>
        {((famousPeople ? gameStore.famousPeople : beautyGoats) || [])
          .filter((item) => item.name?.toLowerCase()?.includes((filter?.name || "").toLowerCase()))
          .map((item, index) => (
            <Grid key={item.id} item xs={6}>
              <BeautyItem item={item}
                defaultImage={listGoatDefaultImages[index % listGoatDefaultImages.length]}
                onClick={() => {
                  onClickItem(item)
                }} />
            </Grid>
          ))}
      </Grid>
    </Flex>
  )
})