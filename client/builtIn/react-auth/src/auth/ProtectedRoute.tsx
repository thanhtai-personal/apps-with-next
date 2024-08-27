import { nanoid } from "nanoid";
import { PropsWithChildren, useState } from "react";
import { hasAuthParams, useAuth } from "react-oidc-context";
import { useLoginRedirect } from "./store";
import { useIsomorphicEffect } from "./useIsomorphicEffect";

export interface ProtectedRouteProps {
  authenticating?: React.ReactNode;
  fallback?: React.ReactNode;
  successRedirect: string;
}

export const ProtectedRoute = ({
  children,
  authenticating = <div>Signing you in/out...</div>,
  fallback = <div>Unable to log in</div>,
  successRedirect,
}: PropsWithChildren<ProtectedRouteProps>) => {
  const auth = useAuth();
  const [hasTriedSignIn, setHasTriedSignIn] = useState(false);
  const { setLoginRedirect } = useLoginRedirect();

  // automatically sign-in
  useIsomorphicEffect(() => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !hasTriedSignIn
    ) {
      setLoginRedirect(successRedirect);
      setHasTriedSignIn(true);
      auth.signinRedirect({ nonce: nanoid() }).catch(() => {
        setHasTriedSignIn(false);
      });
    }
  }, [auth, hasTriedSignIn]);

  if (auth.isLoading) {
    return authenticating;
  }

  if (!auth.isAuthenticated) {
    return fallback;
  }
  return <>{children}</>;
};
