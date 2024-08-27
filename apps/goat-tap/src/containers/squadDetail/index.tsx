import { Navigator } from "@/components/Navigator";
import { useGlobalStyles } from "@/styles/globalStyle";
import { observer } from "@core-ui/react-mobx-state";
import { Colors, Flex, LazyImage, Text } from "@core-ui/react-mui-core";
import diamonGoat180 from "@/assets/images/diamon-goat-180.png";
import { InviteFriendBlock } from "@/components/InviteFriendBlock";
import { TopGoatTokenBlock } from "@/components/TopGoatTokenBlock";
import { useMemo } from "react";
import { useAppBg } from "@/hooks/useAppBg";
import appBg3 from "@/assets/images/app-bg-3.png"

const SquadDetailContainer = observer(() => {
  const globalStyles = useGlobalStyles();

  useAppBg(appBg3)

  const topGoats = useMemo(() => {
    return ([
      {
        rank: 320,
        name: "(You)",
        goatToken: 100,
        tokenAddress: "0x756689BdEcDE115D37D880E26eb28EfC749a97d7",
      },
      {
        rank: 1,
        name: "Robert Fox",
        goatToken: 10000000,
        tokenAddress: "0x756689BdEcDE115D37D880E26eb28EfC749a97d7",
      },
      {
        rank: 2,
        name: "Annette Black",
        goatToken: 1000000,
        tokenAddress: "0x756689BdEcDE115D37D880E26eb28EfC749a97d7",
      },
      {
        rank: 3,
        name: "Devon Lane",
        goatToken: 100000,
        tokenAddress: "0x756689BdEcDE115D37D880E26eb28EfC749a97d7",
      },
      {
        rank: 4,
        name: "Ralph Edwards",
        goatToken: 10000,
        tokenAddress: "0x756689BdEcDE115D37D880E26eb28EfC749a97d7",
      },
      {
        rank: 5,
        name: "Eleanor Pena",
        goatToken: 1000,
        tokenAddress: "0x756689BdEcDE115D37D880E26eb28EfC749a97d7",
      }
    ])
  }, [])


  return (<Flex fullWidth column py={2}>
    <Flex fullWidth>
      <Navigator back={"/boost"} />
    </Flex>
    <Flex center fullWidth mt={6} column>
      <LazyImage src={diamonGoat180} style={{ width: 180 }} />
      <Text mx={2} className={globalStyles.textOrbiBold32} textAlign={"center"} color={Colors.white}>
        DiamondGoat.eth
      </Text>
      <Text mx={2} className={globalStyles.textKanit14} textAlign={"center"}>
        Pellentesque nec nam aliquam sem. Ipsum nunc aliquet bibendum enim facilisis gravida neque. Integer feugiat scelerisque varius morbi enim.
      </Text>
    </Flex>
    <Flex px={2} fullWidth column center mt={4}>
      <InviteFriendBlock />
    </Flex>

    <Flex px={2} fullWidth column center mt={4}>
      <TopGoatTokenBlock data={topGoats} />
    </Flex>

  </Flex>)
});

export default SquadDetailContainer;
