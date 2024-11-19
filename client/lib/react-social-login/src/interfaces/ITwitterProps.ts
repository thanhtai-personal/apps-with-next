import { IResolveParams, objectType } from "node_modules/reactjs-social-login/dist";

export interface ITwitterProps {
  client_id: string;
  className?: string;
  redirect_uri: string;
  state?: string;
  fields?: string;
  scope?: string;
  children?: React.ReactNode;
  isOnlyGetCode?: boolean;
  isOnlyGetToken?: boolean;
  onLoginStart?: () => void;
  onLogoutSuccess?: () => void;
  onReject: (reject: string | objectType) => void;
  onResolve: ({ provider, data }: IResolveParams) => void;
}
