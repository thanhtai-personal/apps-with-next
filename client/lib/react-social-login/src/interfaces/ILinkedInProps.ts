import { IResolveParams, objectType } from "node_modules/reactjs-social-login/dist";

export interface ILinkedInProps {
  state?: string;
  scope?: string;
  client_id: string;
  className?: string;
  redirect_uri: string;
  client_secret: string;
  response_type?: string;
  isOnlyGetCode?: boolean;
  isOnlyGetToken?: boolean;
  children?: React.ReactNode;
  onLoginStart?: () => void;
  onReject: (reject: string | objectType) => void;
  onResolve: ({ provider, data }: IResolveParams) => void;
}
