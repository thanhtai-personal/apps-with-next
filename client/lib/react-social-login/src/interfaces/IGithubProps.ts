import { IResolveParams, objectType } from "node_modules/reactjs-social-login/dist";

export interface IGithubProps {
  state?: string;
  scope?: string;
  client_id: string;
  className?: string;
  redirect_uri: string;
  client_secret: string;
  allow_signup?: boolean;
  isOnlyGetToken?: boolean;
  isOnlyGetCode?: boolean;
  children?: React.ReactNode;
  onLoginStart?: () => void;
  onLogoutSuccess?: () => void;
  onReject: (reject: string | objectType) => void;
  onResolve: ({ provider, data }: IResolveParams) => void;
}
