import { IResolveParams, objectType } from "node_modules/reactjs-social-login/dist";

export interface IInstagramProps {
  scope?: string;
  state?: string;
  fields?: string;
  client_id: string;
  className?: string;
  client_secret: string;
  redirect_uri: string;
  response_type?: string;
  isOnlyGetCode?: boolean;
  isOnlyGetToken?: boolean;
  children?: React.ReactNode;
  onLogoutSuccess?: () => void;
  onLoginStart?: () => void;
  onReject: (reject: string | objectType) => void;
  onResolve: ({ provider, data }: IResolveParams) => void;
}
