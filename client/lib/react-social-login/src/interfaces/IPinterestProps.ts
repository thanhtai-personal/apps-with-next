import { IResolveParams, objectType } from "node_modules/reactjs-social-login/dist";

export interface IPinterestProps {
  state?: string;
  scope?: string;
  client_id: string;
  client_secret: string;
  className?: string;
  redirect_uri: string;
  children?: React.ReactNode;
  isOnlyGetCode?: boolean;
  isOnlyGetToken?: boolean;
  onLoginStart?: () => void;
  onReject: (reject: string | objectType) => void;
  onResolve: ({ provider, data }: IResolveParams) => void;
}
