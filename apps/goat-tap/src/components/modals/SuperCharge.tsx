import { observer } from "@core-ui/react-mobx-state";
import { AppTheme, Flex, LazyImage, Loading, OutlinedButton, Text } from "@core-ui/react-mui-core";
import superCharge from "@/assets/images/super-charge.png"
import { useGlobalStyles } from "@/styles/globalStyle";
import { createStyles, makeStyles } from "@core-ui/react-mui-core/style";
import { Colors } from "@/styles/colors";
import coin24 from "@/assets/images/coin24.png"
import { BoostType, useGoatTapStore } from "@core-ui/react-goat-tap";

export const SuperCharge = observer(({
  buyBooster,
}: {
  buyBooster: (boostType: BoostType) => Promise<void>
}) => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();

  const { accountStore, boostStore } = useGoatTapStore();
  const superChargeItem = boostStore.boostItems.find(b => b.type === BoostType.SuperCharge) || {}

  return (
    <Flex fullWidth column center>
      <Flex fullWidth center mt={2}>
        <LazyImage src={superCharge} style={{ width: 80 }} />
      </Flex>
      <Text className={globalStyles.textOrbi24} mt={2}>
        Super Charge
      </Text>
      <Flex column center className={styles.contentWrapper} mt={2}>
        <Text color={"#222933"} className={globalStyles.textKanit16} textAlign={"center"}>
        XP/Tap will upgrade from {Number(superChargeItem.pointsPerTap)} to {Number(superChargeItem.nextLevelPointsPerTap)}. But you will lose all the energy
        </Text>
        <Flex mt={1} centerY>
          <Text className={globalStyles.textKanit16} color={"#222933"} mr={0.5}>Fee: </Text>
          <LazyImage src={coin24} style={{ width: 24 }} />
          <Text className={globalStyles.textKanit16} color={"#222933"} ml={0.5}>{Number(superChargeItem?.goatPrice) || 0}</Text>
        </Flex>
      </Flex>
      <Flex fullWidth my={2} mt={1}>
        <OutlinedButton
          style={{
            border: "none",
            background: Colors.white,
            borderRadius: "40px",
            width: "100%"
          }}
          disabled={Number(accountStore.account?.points!) < Number(superChargeItem?.goatPrice || 0)}
          onClick={async (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            if (boostStore.buying) return;
            if (Number(accountStore.account?.points!) < Number(superChargeItem?.goatPrice || 0)) return;
            await buyBooster(BoostType.SuperCharge);
          }}
        >
          {boostStore.buying ?
            <Loading size={16} />
          : <Text color={"#1B1D21"} className={globalStyles.textKanitBold16}>
            Confirm
          </Text>}
        </OutlinedButton>
      </Flex>
    </Flex>
  )
})

const useStyles = makeStyles((_theme: AppTheme) => createStyles({
  contentWrapper: {
    padding: 16,
    background: "linear-gradient(90deg, #EACDA3 0%, #D6AE7B 100%)",
    border: "1px solid #FFE5BB",
    boxShadow: "0px 0px 16px rgba(255, 187, 77, 0.9)",
    borderRadius: "8px",
  }
}))
