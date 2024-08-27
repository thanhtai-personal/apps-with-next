import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface LoginRedirectStore {
  loginRedirect?: string;
  setLoginRedirect: (redirectUrl?: string) => void;
  redirectUrl: () => string | undefined;
}

export const useLoginRedirect = create(
  persist<LoginRedirectStore>(
    (set, get) => ({
      setLoginRedirect(redirectUrl?: string) {
        set({ loginRedirect: redirectUrl });
      },
      redirectUrl() {
        const redirectUrl = get().loginRedirect;
        set({ loginRedirect: undefined });
        return redirectUrl;
      },
    }),
    {
      name: "login-callback", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
