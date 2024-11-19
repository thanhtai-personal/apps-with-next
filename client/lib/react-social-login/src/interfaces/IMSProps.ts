import { IResolveParams, objectType } from "node_modules/reactjs-social-login/dist";

export interface IMSProps {
  scope?: string;
  state?: string;
  client_id: string;
  className?: string;
  redirect_uri: string;
  response_type?: string;
  response_mode?: string;
  code_challenge?: string;
  children?: React.ReactNode;
  isOnlyGetCode?: boolean;
  isOnlyGetToken?: boolean;
  onLoginStart?: () => void;
  onReject: (reject: string | objectType) => void;
  code_challenge_method?: 'plain' | 's256'[];
  onResolve: ({ provider, data }: IResolveParams) => void;
  tenant?: 'common' | 'organizations' | 'consumers';
  prompt?: 'login' | 'none' | 'consent' | 'select_account';
}
