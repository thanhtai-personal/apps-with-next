import { observer } from "@core-ui/react-mobx-state";
import copyIcon from "@/assets/icons/copy.svg"
import { Flex, LazyImage, NotiStackInstance, OutlinedButton, Text } from "@core-ui/react-mui-core";
import clsx from "@core-ui/react-mui-core/clsx"
import { useGlobalStyles } from "@/styles/globalStyle";
import { Link } from "@core-ui/react-core";
import copiedIcon from "@/assets/icons/coppied.svg"
import { useStore } from "../store";
import { useClipboardContext } from "@/hooks/useClipboardContext";
import { useGoatTapStore } from "@core-ui/react-goat-tap";

export const ReferralFriendBlock = observer(() => {
  const globalStyles = useGlobalStyles();
  const { uiStore } = useStore();
  const { accountStore } = useGoatTapStore();
  useClipboardContext();

  const referralLink = `${import.meta.env.VITE_TELEGRAM_APP_URL}?startapp=${accountStore.account?.referralParams}`;

  return (
    <Flex minHeight={250} className={clsx(globalStyles.borderTopBox)} fullWidth bgcolor={"#12161D"}
      column p={2}
    >
      <Flex fullWidth>
      </Flex>

      <Flex fullWidth mt={4}>
        <Flex flex={5} column overflow={"hidden"} pr={2}>
          <Text
            color={"#DDDFE3"}
            style={{
              fontFamily: 'Inter',
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "24px",
            }}
          >Your Referral link</Text>
          <Link
            to={referralLink}
            target={"_blank"}
            style={{
              cursor: "pointer",
            }}
          ><Text whiteSpace={"nowrap"} textOverflow={"ellipsis"}
            overflow={"hidden"}
            color="#5E7EED">{referralLink}</Text></Link>
        </Flex>
        <Flex flex={2}>
          <OutlinedButton style={{
            width: "100%",
            borderRadius: 24,
            background: "#1263FF",
            padding: "0 16px",
            border: "none",
          }}
            onClick={() => {
              navigator?.clipboard?.writeText?.(referralLink)
              NotiStackInstance.push({
                children: "Copied!",
                variant: "info"
              })
            }}
          >
            <Text className={globalStyles.textKanitBold16}>Copy</Text>
          </OutlinedButton>
        </Flex>
      </Flex>
      <Flex fullWidth mt={4}>
        <Text
          color={"#DDDFE3"}
          style={{
            fontFamily: 'Inter',
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "24px",
          }}
        >Your referral code</Text>
      </Flex>
      <Flex fullWidth centerY justifyContent={"space-between"} border={"solid 1px #FFFFFF21"} borderRadius={"24px"} p={2}>
        <Text className={globalStyles.textKanit14}>
          {accountStore.account?.referralParams || ""}
        </Text>
        {accountStore.account?.referralParams
          && uiStore.clipboardText?.includes(accountStore.account?.referralParams) ?
          <LazyImage src={copiedIcon} style={{ width: 24 }} />
          :
          <Flex cursorPointer onClick={async () => {
            navigator?.clipboard?.writeText?.(referralLink);
            uiStore.clipboardText = referralLink;
            NotiStackInstance.push({
              children: "Copied!",
              variant: "info"
            })
          }}>
            <LazyImage src={copyIcon}
              style={{
                cursor: "pointer",
                width: 24
              }} />
          </Flex>}
      </Flex>
    </Flex>
  )
})