import { IResolveParams, objectType } from "node_modules/reactjs-social-login/dist";

export interface IFacebookProps {
  appId: string;
  scope?: string;
  state?: boolean;
  xfbml?: boolean;
  cookie?: boolean;
  version?: string;
  language?: string;
  auth_type?: string;
  className?: string;
  isDisabled?: boolean;
  isOnlyGetToken?: boolean;
  onLoginStart?: () => void;
  onLogoutSuccess?: () => void;
  onReject: (reject: string | objectType) => void;
  onResolve: ({ provider, data }: IResolveParams) => void;
  redirect_uri?: string;
  fieldsProfile?: string;
  response_type?: string;
  return_scopes?: boolean;
  children?: React.ReactNode;
}