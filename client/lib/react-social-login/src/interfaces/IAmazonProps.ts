import { IResolveParams, objectType } from "node_modules/reactjs-social-login/dist";

export interface IAmazonProps {
  scope?: string;
  state?: string;
  client_id: string;
  className?: string;
  redirect_uri?: string;
  response_type?: string;
  scope_data?: objectType;
  isOnlyGetToken?: boolean;
  children?: React.ReactNode;
  onLoginStart?: () => void;
  onReject: (reject: string | objectType) => void;
  onResolve: ({ provider, data }: IResolveParams) => void;
}