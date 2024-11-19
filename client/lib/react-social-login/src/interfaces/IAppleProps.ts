import { IResolveParams, objectType } from "node_modules/reactjs-social-login/dist";

export interface IAppleProps {
  scope?: string;
  client_id: string;
  className?: string;
  redirect_uri?: string;
  children?: React.ReactNode;
  onLoginStart?: () => void;
  onReject: (reject: string | objectType) => void;
  onResolve: ({ provider, data }: IResolveParams) => void;
}