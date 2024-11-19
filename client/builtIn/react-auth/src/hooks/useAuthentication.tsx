import AppCenterSDK, { AppcenterSDK } from "@core-sdk/app-center";
import { useAuthenticationStore } from "../store";
import { useEffect } from "react";
import { useLocalStorageData } from "@core-utils/react-hooks";
import Cookies from 'universal-cookie';
import { IResetPasswordRequest } from "@core-ui/ums-types";

export const useAuthen = (isAdmin?: boolean) => {
  const { authStore, notiStore } = useAuthenticationStore();
  const [token, setToken] = useLocalStorageData("token", true);
  const cookies = new Cookies(null, { path: '/' });

  const onLogin = async (redirect?: string) => {
    try {
      if (!authStore.loginData) return;

      authStore.loading = true;
      const response: any = await AppCenterSDK.getInstance().login?.(authStore.loginData);
      AppCenterSDK.getInstance().setAccessToken(response.data.access_token)
      // Save access token in local storage
      setToken(response.data.access_token);
      // Save refresh token in cookie
      cookies.set('refreshToken', response.data.refreshToken, { path: '/' });
      // Store authentication data
      authStore.authData = response.data.user;

      notiStore.messageQueue?.push({
        children: "Login success",
        variant: "success"
      });

      if (redirect) {
        window.location.replace(redirect);
      }
    } catch (error) {
      notiStore.messageQueue?.push({
        children: "Login Failed",
        variant: "error"
      });
    } finally {
      authStore.loading = false;
    }
  };

  const onLogout = async () => {
    try {
      await AppCenterSDK.getInstance().logout?.();
      setToken(null);
      localStorage.clear();
      cookies.remove('refreshToken', { path: '/' }); // Remove refresh token cookie
      
      notiStore.messageQueue?.push({
        children: "Logout successful",
        variant: "success"
      });

      authStore.wasFinishedValidate = false;
      window.location.replace("/login"); // Redirect to login page
    } catch (error) {
      notiStore.messageQueue?.push({
        children: "Logout Failed",
        variant: "error"
      });
    }
  };

  const onResetPassword = async (data: IResetPasswordRequest) => {
    try {
      authStore.loading = true;
      await AppCenterSDK.getInstance().resetPassword?.(data);
      notiStore.messageQueue?.push({
        children: "Password reset email sent",
        variant: "success"
      });
    } catch (error) {
      notiStore.messageQueue?.push({
        children: "Password reset failed",
        variant: "error"
      });
    } finally {
      authStore.loading = false;
    }
  };

  const refreshToken = async () => {
    try {
      const response: any = await AppCenterSDK.getInstance().refreshToken?.();
      response.data.access_token && setToken(response.data.access_token);
      notiStore.messageQueue?.push({
        children: "Token refreshed successfully",
        variant: "success"
      });
    } catch (error) {
      notiStore.messageQueue?.push({
        children: "Token refresh failed",
        variant: "error"
      });
      onLogout();
    }
  };

  const checkValidToken = async () => {
    try {
      authStore.loading = true;
      const checkedToken = await AppcenterSDK.getInstance().validateToken();
      if (!checkedToken) {
        onLogout();
      }
      authStore.loading = false;
    } catch (error) {
      notiStore.messageQueue?.push({
        children: "Token expired, please login again",
        variant: "error"
      });
      onLogout();
    } finally {
      authStore.wasFinishedValidate = true;
    }
  }

  return {
    onLogin,
    onLogout,
    onResetPassword,
    refreshToken,
    checkValidToken
  };
};

export const runAuthen = () => {
  const [token, setToken] = useLocalStorageData("token", true);
  const { onLogout, checkValidToken } = useAuthen();
  const { authStore } = useAuthenticationStore();

  const handleLogout = async () => {
    try {
      await onLogout();
    } catch (error) {
      window.location.replace("/login");
    }
  }

  useEffect(() => {
    if (!token && authStore.wasFinishedValidate) {
      handleLogout();
    } else if (token) {
      AppcenterSDK.getInstance().setAccessToken(token);
    }
    if (!authStore.wasFinishedValidate) {
      checkValidToken();
    }
  }, [token, authStore.wasFinishedValidate]);
};
