import { useGlobalStyles } from "@/styles/globalStyle";
import { Animates } from "@core-ui/react-animates";
import { observer } from "@core-ui/react-mobx-state";
import { Flex, LazyImage, Text } from "@core-ui/react-mui-core";
import { formatNumberWithCommas } from "@core-utils/utils-helpers";
import { IFamousPerson } from "@core-ui/goat-tap-types";
import dontshowyourcat from "@/assets/images/dontshowyourcat.png"

export const WinnerCard = observer(({
  winner,
}: {
  winner: IFamousPerson
}) => {
  const globalStyles = useGlobalStyles();
  const { image, groupPoints = 0, name, project, } = winner;

  return (
    <Flex fullWidth column pt={2} center>
      <LazyImage src={image || dontshowyourcat} style={{ width: 64, height: 64, borderRadius: "100%" }} />
      <Text textAlign={"center"} className={globalStyles.textKanitBold14} style={{
        width: "100%",
      }}>{name}</Text>
      <Text textAlign={"center"} style={{
        width: "100%",
      }} className={globalStyles.textKanit12}>{project}</Text>
      {groupPoints > 20000 ? <Animates.AnimatedNumber value={groupPoints}>
        {(value) => {
          return <Text className={globalStyles.textKanit12}>{
            formatNumberWithCommas(value)
          }</Text>
        }}
      </Animates.AnimatedNumber> : <Text className={globalStyles.textKanit12}>{
        formatNumberWithCommas(groupPoints)
      }</Text>}
    </Flex>
  )
})