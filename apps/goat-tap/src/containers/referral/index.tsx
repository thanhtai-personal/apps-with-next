import { observer } from "@core-ui/react-mobx-state";
import { Flex, LazyImage, OutlinedButton, Text } from "@core-ui/react-mui-core";
import bgImage3 from "@/assets/images/app-bg-3.png"
import { MIN_CONTENT_HEIGHT } from "@/utils/constants";
import { useAppBg } from "@/hooks/useAppBg";
import { useGlobalStyles } from "@/styles/globalStyle";
import { ReferralFriendBlock } from "@/components/ReferralFriendBlock";
import { Colors } from "@/styles/colors";
import gift96 from "@/assets/images/gift-bix-96.png"
import { useGoatTapStore, useFriends } from "@core-ui/react-goat-tap";
import { FriendList } from "@/components/FriendList";
import { useBottomMenu } from "@/hooks/useBottomMenu";
import { Link } from "@core-ui/react-core";

const ReferralContainer = observer(() => {
  const globalStyles = useGlobalStyles();
  const { accountStore } = useGoatTapStore();
  useAppBg(bgImage3);
  const referralLink = `${import.meta.env.VITE_TELEGRAM_APP_URL}?startapp=${accountStore.account?.referralParams}`;
  const text = "A friend has invited you to join Goat Tap"
  const shareLink = `https://t.me/share/url?url=${referralLink}&text=${text}`

  const { loadMore } = useFriends();

  useBottomMenu();

  return (<Flex fullWidth column>
    <Flex minHeight={MIN_CONTENT_HEIGHT} column fullWidth centerY p={2} position={"relative"}>
      <Flex fullWidth center mt={4}>
        <Text className={globalStyles.textOrbi32}>
          Fren Zone
        </Text>
      </Flex>

      <Flex fullWidth mt={2}>
        <ReferralFriendBlock />
      </Flex>

      <Flex fullWidth mt={1} column>
        <Text className={globalStyles.textKanitBold16} my={1}>Frens List</Text>
        <FriendList
          total={accountStore.totalFriends || 0}
          data={accountStore.friends || []}
          loadMore={{
            handler: loadMore,
            loading: false,
          }}
          empty={
            <Flex column fullWidth center p={2}>
              <Flex fullWidth center mt={2} py={2}>
                <LazyImage src={gift96} style={{ width: 96 }} />
              </Flex>
              <Link to={shareLink} target="_blank">
                <OutlinedButton
                  style={{
                    background: Colors.white,
                    width: "100%",
                    borderRadius: "32px",
                    padding: "16px"
                  }}
                >
                  <Text className={globalStyles.textKanitBold16} color={"#1B1D21"}>Invite a fren</Text>
                </OutlinedButton>
              </Link>
            </Flex>
          }
        />
      </Flex>

    </Flex>
  </Flex>)
});

export default ReferralContainer;
