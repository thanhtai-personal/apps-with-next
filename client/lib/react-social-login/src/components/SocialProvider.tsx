import { ReactNode } from "react";
import * as Interfaces from "../interfaces"
import { GoogleOAuthProvider } from '@react-oauth/google';

export const SocialProvider = ({ children, config }: { children: ReactNode; config: Interfaces.ISocialConfig }) => {
  let rsComponent = children;

  if (config.useGoogle) {
    rsComponent = <GoogleOAuthProvider clientId={config.ggAppId || ""}>
      {rsComponent}
    </GoogleOAuthProvider>
  }

  return rsComponent
}