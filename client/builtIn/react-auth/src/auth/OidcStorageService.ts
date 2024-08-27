import { AuthProviderNoUserManagerProps } from "react-oidc-context";
import { User } from "oidc-client-ts";

export class OidcStorageService {
  constructor(
    protected conf: AuthProviderNoUserManagerProps,
    protected storage: Storage = window.localStorage,
  ) {}

  getUser(): User | null;
  getUser(ensure: true): User;
  getUser(ensure?: boolean) {
    const oidcStorage = this.storage.getItem(
      `oidc.user:${this.conf.authority}:${this.conf.client_id}`,
    );

    if (ensure && !oidcStorage) {
      throw new Error("User not found in storage");
    }

    if (!oidcStorage) {
      return null;
    }

    return User.fromStorageString(oidcStorage);
  }

  getProfile() {
    return this.getUser(true).profile;
  }

  getAccessToken() {
    return this.getUser()?.access_token;
  }
}
