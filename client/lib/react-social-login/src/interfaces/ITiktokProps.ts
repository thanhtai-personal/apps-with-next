import { IResolveParams, objectType } from "node_modules/reactjs-social-login/dist";

export interface ITiktokProps {
  state?: string;
  scope?: string;
  client_key: string;
  // client_secret: string;
  className?: string;
  redirect_uri: string;
  // isOnlyGetToken?: boolean;
  // isOnlyGetCode?: boolean;
  children?: React.ReactNode;
  onLoginStart?: () => void;
  // onLogoutSuccess?: () => void;
  onReject: (reject: string | objectType) => void;
  onResolve: ({ provider, data }: IResolveParams) => void;
}
