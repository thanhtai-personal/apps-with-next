import GoatTapSDK from "@core-sdk/goat-tap"
import { useEffect } from "react"
import { useGoatTapStore } from "../store";
import { parseURLHash } from "@core-utils/utils-helpers"
import WebApp from '@twa-dev/sdk';

const extractData = (params: any) => {
  if (!params.tgWebAppData) return null;
  const query_id = params.tgWebAppData.match(/query_id=([^&]*)/)?.at(1);
  const userEncoded = params.tgWebAppData.match(/user=([^&]*)/)?.at(1);
  const userDecoded = JSON.parse(decodeURIComponent(userEncoded));
  /*
    allows_write_to_pm: true
    first_name: string
    id: number
    language_code: "en"
    last_name: string
    username: string
   */
  const auth_date = params.tgWebAppData.match(/auth_date=([^&]*)/)?.at(1);
  const hash = params.tgWebAppData.match(/hash=([^&]*)/)?.at(1);
  const start_param = params.tgWebAppData.match(/start_param=([^&]*)/)?.at(1);

  return {
    query_id,
    user: userDecoded,
    auth_date,
    hash,
    start_param
  };
}

export const getTelegramAuthData = () => {
  const locationQuery = parseURLHash(window.location.href) || {};
  return extractData(locationQuery);
}


export const useTelegramAuthen = () => {
  const { accountStore, gameStore } = useGoatTapStore();

  useEffect(() => {
    WebApp?.disableVerticalSwipes?.();
  }, [])

  const handleAuthenError = (message: string) => {
    gameStore.messageQueue = [
      {
        children: message,
        variant: "error",
      },
    ];
    // accountStore.isLoading = false;
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1500)
  }

  useEffect(() => {
    let user: any = null;
    let startParam: any = null;
    const webAppData = WebApp.initData || WebApp.initDataUnsafe;
    if (webAppData) {
      if (typeof webAppData === 'string') {
        const params = new URLSearchParams(webAppData);
        const userParam = params.get('user');
        startParam = params.get('start_param');
        if (userParam) {
          user = JSON.parse(decodeURIComponent(userParam));
        }
      } else {
        user = webAppData.user
        startParam = webAppData.start_param
      }
    } else {
      user = getTelegramAuthData()?.user;
      startParam = getTelegramAuthData()?.start_param;
    }
    accountStore.isLoading = true;
    if (user) {
      accountStore.chatId = user.id;
      (async () => {
        try {
          const authData: any = await GoatTapSDK.getInstance().login(user.id!, startParam || undefined);
          accountStore.accessToken = authData.access_token;
          GoatTapSDK.getInstance().setAccessToken(authData.access_token);
          if (authData.access_token) {
            localStorage.setItem("token", authData.access_token);
            accountStore.account = authData.user;
          } else {
            handleAuthenError("Empty user data")
          }
          accountStore.isLoading = false;
        } catch (error: any) {
          handleAuthenError(error.message || "Empty user data")
        }
      })();
    } else {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        accountStore.isLoading = false;
        GoatTapSDK.getInstance().setAccessToken(storedToken);
        accountStore.gettingAuth = true;
        (async () => {
          try {
            const authData: any = await GoatTapSDK.getInstance().getAuth();
            accountStore.accessToken = storedToken;
            GoatTapSDK.getInstance().setAccessToken(authData.access_token);
            if (authData.access_token) {
              localStorage.setItem("token", authData.access_token);
              accountStore.account = authData.user;
              accountStore.gettingAuth = false;
            } else {
              handleAuthenError("Empty user data");
            }
          } catch (error: any) {
            handleAuthenError(error?.message || "Authen error");
          }
        })();
      }
    }
  }, [])

}