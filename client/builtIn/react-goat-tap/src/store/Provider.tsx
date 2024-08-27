import { ReactNode, useEffect } from "react";
import { CreateApiConfig, GoatTapSDK } from "@core-sdk/goat-tap"
import WebApp from "@twa-dev/sdk";
import { TonConnectionProvider, THEME } from "@core-ui/react-ton-connection"
import { useDeviceDetection } from "../hooks";

export const GoatTapProvider = ({ children, config }: {
  children: ReactNode; config: {
    apiConfig: CreateApiConfig;
    isTestNet?: boolean;
    tonConfig: {
      manifestUrl: string;
      twaReturnUrl: string;
    }
  }
}) => {

  const { isIOS } = useDeviceDetection();

  useEffect(() => {
    if (!WebApp?.ready) return;
    GoatTapSDK.getInstance(config.apiConfig)
    const scrollableEl = document.getElementById('app-scrollable');

    WebApp.expand();
    WebApp.enableClosingConfirmation();
    // const MainButton = WebApp.MainButton;
    // MainButton.show();
    // MainButton.setText("Close");
    // MainButton.onClick(() => {
    //   WebApp.close();
    // })

    // const SettingsButton = WebApp.SettingsButton;
    // SettingsButton.show();
    // SettingsButton.onClick(() => {
    //   WebApp.showPopup({
    //     message: "Configuration your application",
    //     buttons: [{
    //       id: "1",
    //       type: "close",
    //     },{
    //       id: "2",
    //       type: "default",
    //       text: "Test",
    //     }],
    //     title: "Settings"
    //   }, () => {})
    // });

    const overflow = 100;
    function setupDocument(enable: boolean) {
      if (enable) {
        window.scrollTo(0, overflow);
      } else {
        window.scrollTo(0, 0);
      }
    }

    let ts: number | undefined;
    const onTouchStart = (e: TouchEvent) => {
      ts = e.touches[0]!.clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (scrollableEl) {
        const scroll = scrollableEl.scrollTop;
        const te = e.changedTouches[0]!.clientY;
        if (scroll <= 0 && ts! < te) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    };

    const onScroll = () => {
      if (window.scrollY < overflow) {
        window.scrollTo(0, overflow);
        if (scrollableEl) {
          scrollableEl.scrollTo(0, 0);
        }
      }
    };

    !isIOS && setupDocument(true);
    !isIOS && document.documentElement.addEventListener('touchstart', onTouchStart, { passive: false });
    !isIOS && document.documentElement.addEventListener('touchmove', onTouchMove, { passive: false });
    !isIOS && window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      !isIOS && setupDocument(false);
      !isIOS && document.documentElement.removeEventListener('touchstart', onTouchStart);
      !isIOS && document.documentElement.removeEventListener('touchmove', onTouchMove);
      !isIOS && window.removeEventListener('scroll', onScroll);
    };
  }, [WebApp?.ready]);

  return <TonConnectionProvider
    config={{
      manifestUrl: config.tonConfig.manifestUrl,
      uiPreferences: { theme: THEME.DARK },
      walletsListConfiguration: {
        includeWallets: [
          // {
          //   appName: 'safepalwallet',
          //   name: 'SafePal',
          //   imageUrl: 'https://s.pvcliping.com/web/public_image/SafePal_x288.png',
          //   aboutUrl: 'https://www.safepal.com/download',
          //   jsBridgeKey: 'safepalwallet',
          //   platforms: ['ios', 'android', 'chrome', 'firefox']
          // },
          {
            appName: 'tonwallet',
            name: 'TON Wallet',
            imageUrl: 'https://wallet.ton.org/assets/ui/qr-logo.png',
            aboutUrl: 'https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd',
            universalLink: 'https://wallet.ton.org/ton-connect',
            jsBridgeKey: 'tonwallet',
            bridgeUrl: 'https://bridge.tonapi.io/bridge',
            platforms: ['chrome', 'android']
          }
        ]
      },
      actionsConfiguration: {
        returnStrategy: 'back',
        twaReturnUrl: config.tonConfig.twaReturnUrl,
      },
    }}
  >
    {children}
  </TonConnectionProvider>
}