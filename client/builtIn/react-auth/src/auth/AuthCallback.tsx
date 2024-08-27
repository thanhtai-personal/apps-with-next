import { useAuth } from "react-oidc-context";
import { useLoginRedirect } from "./store";
import { useIsomorphicEffect } from "./useIsomorphicEffect";

export interface AuthCallbackProps {
  redirect?: (url: string) => void;
  defaultRedirectUrl?: string;
}

export const AuthCallback = ({
  redirect,
  defaultRedirectUrl,
}: AuthCallbackProps) => {
  const auth = useAuth();
  const { redirectUrl } = useLoginRedirect();
  useIsomorphicEffect(() => {
    if (auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading) {
      const url = redirectUrl();
      if (!url && !defaultRedirectUrl) {
        return;
      }
      redirect?.(url || defaultRedirectUrl!);
    }
  }, [auth]);

  return null;
};
