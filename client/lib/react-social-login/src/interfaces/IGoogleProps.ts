import { IResolveParams, objectType } from "node_modules/reactjs-social-login/dist";

export interface IGoogleProps {
  scope?: string;
  prompt?: string;
  ux_mode?: string;
  client_id: string;
  className?: string;
  login_hint?: string;
  access_type?: string;
  redirect_uri?: string;
  cookie_policy?: string;
  hosted_domain?: string;
  discoveryDocs?: string;
  children?: React.ReactNode;
  onLoginStart?: () => void;
  isOnlyGetToken?: boolean;
  onReject: (reject: string | objectType) => void;
  fetch_basic_profile?: boolean;
  onResolve: ({ provider, data }: IResolveParams) => void;
}
