import { Flex, Text } from "@core-ui/react-mui-core"
import { CSSProperties, ReactNode, useCallback, useEffect, useState } from "react"
import * as Interfaces from "../interfaces"
import * as SocialLogin from 'reactjs-social-login'
import * as SocialLoginButtons from 'react-social-login-buttons'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

export interface ISocialProviderProps {
  children: ReactNode;
  config: Interfaces.ISocialConfig;
  twitterProps?: Interfaces.ITwitterProps
  tiktokProps?: Interfaces.ITiktokProps
  pinterestProps?: Interfaces.IPinterestProps
  msProps?: Interfaces.IMSProps
  amazonProps?: Interfaces.IAmazonProps
  appleProps?: Interfaces.IAppleProps
  facebookProps?: Interfaces.IFacebookProps
  githubProps?: Interfaces.IGithubProps
  instagramProps?: Interfaces.IInstagramProps
  linkedinProps?: Interfaces.ILinkedInProps
  googleProps?: Interfaces.IGoogleProps;
  startLogin: () => Promise<void>;
  logout: () => Promise<void>;
  loginSuccess: (provider: string, profile: any) => Promise<void>;
  loginFailed: (err: any) => Promise<void>;
  styles?: {
    container?: CSSProperties;
    loginCompoponent?: CSSProperties;
    buttonComponent?: CSSProperties;
  }
}

export const SocialsLogin = ({
  children,
  config,
  startLogin,
  logout,
  loginSuccess,
  loginFailed,
  styles,
  twitterProps,
  tiktokProps,
  pinterestProps,
  msProps,
  amazonProps,
  appleProps,
  facebookProps,
  githubProps,
  instagramProps,
  linkedinProps,
  googleProps,
}: ISocialProviderProps) => {
  const [provider, setProvider] = useState('')
  const [profile, setProfile] = useState<any>()

  const onLoginStart = useCallback(() => {
    startLogin?.();
  }, [])

  const onLogoutSuccess = useCallback(() => {
    setProfile(null)
    setProvider('');
    logout?.();
  }, [])

  const getGGProfileData = async (provider: string, data: any) => {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Bearer ' + data.code,
    });
    const getProfileUrl = "https://www.googleapis.com/oauth2/v3/userinfo?alt=json"
    const dataProfileJson = await fetch(
      getProfileUrl,
      {
        method: 'GET',
        headers,
      },
    )
    const dataProfile = await dataProfileJson.json();
    loginSuccess?.(provider, {
      ...data,
      ...(dataProfile || {})
    });
  }

  const getProfileData = async (provider: string, data: any) => {
    try {
      switch (provider.toLowerCase()) {
        case "google": {
          await getGGProfileData(provider, data);
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log("handle authen error", error)
    }
  }

  const onResolve = useCallback(({ provider, data }: SocialLogin.IResolveParams) => {
    console.log("Logged in with user", data)
    setProvider(provider);
    setProfile(data);
    getProfileData(provider, data)
  }, [loginSuccess, profile])

  const onReject = useCallback((err: any) => {
    console.log(err);
    loginFailed?.(err);
  }, [])

  const renderSocialLogin = (
    LoginComponent: typeof SocialLogin.LoginSocialGoogle,
    ButtonComponent: typeof SocialLoginButtons.GoogleLoginButton,
    props: any
  ) => (
    <LoginComponent
      {...props}
      onLoginStart={onLoginStart}
      onLogoutSuccess={onLogoutSuccess}
      onResolve={onResolve}
      onReject={onReject}
      style={styles?.loginCompoponent || {}}
    >
      <ButtonComponent
        style={styles?.buttonComponent || {}}
      />
    </LoginComponent>
  )

  return (
    <Flex fullWidth column style={styles?.container || {}}>
      {config.useFacebook && renderSocialLogin(SocialLogin.LoginSocialFacebook, SocialLoginButtons.FacebookLoginButton, {
        appId: config.fbAppId,
        fieldsProfile: 'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender',
        redirect_uri: config.redirectUrl,
        ...facebookProps
      })}
      {config.useGoogle && renderSocialLogin(SocialLogin.LoginSocialGoogle, SocialLoginButtons.GoogleLoginButton, {
        client_id: config.ggAppId,
        redirect_uri: config.redirectUrl,
        scope: "openid profile email",
        discoveryDocs: "claims_supported",
        access_type: "online",
        typeResponse: "accessToken",
        ...googleProps
      })}
      {/* {config.useGoogle && <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
          loginSuccess?.("google", credentialResponse);
        }}
        onError={() => {
          loginFailed?.(null);
        }}
      />} */}
      {config.useApple && renderSocialLogin(SocialLogin.LoginSocialApple, SocialLoginButtons.AppleLoginButton, {
        client_id: config.appleId,
        scope: 'name email',
        redirect_uri: config.redirectUrl,
        ...appleProps
      })}
      {config.useAmazon && renderSocialLogin(SocialLogin.LoginSocialAmazon, SocialLoginButtons.AmazonLoginButton, {
        client_id: config.amazonAppId,
        redirect_uri: config.redirectUrl,
        ...amazonProps
      })}
      {config.useInstagram && renderSocialLogin(SocialLogin.LoginSocialInstagram, SocialLoginButtons.InstagramLoginButton, {
        client_id: config.instagramAppId,
        client_secret: config.instagramAppSecret,
        redirect_uri: config.redirectUrl,
        ...instagramProps
      })}
      {config.useMs && renderSocialLogin(SocialLogin.LoginSocialMicrosoft, SocialLoginButtons.MicrosoftLoginButton, {
        client_id: config.microsoftAppId,
        redirect_uri: config.redirectUrl,
        ...msProps
      })}
      {config.useLinkedin && renderSocialLogin(SocialLogin.LoginSocialLinkedin, SocialLoginButtons.LinkedInLoginButton, {
        client_id: config.linkedinAppId,
        client_secret: config.linkedinAppSecret,
        redirect_uri: config.redirectUrl,
        ...linkedinProps
      })}
      {config.useGithub && renderSocialLogin(SocialLogin.LoginSocialGithub, SocialLoginButtons.GithubLoginButton, {
        client_id: config.githubAppId,
        client_secret: config.githubAppSecret,
        redirect_uri: config.redirectUrl,
        ...githubProps
      })}
      {config.usePinterest && renderSocialLogin(SocialLogin.LoginSocialPinterest,
        () => (
          <Flex className="content">
            <Text className="txt">Login With Pinterest</Text>
          </Flex>
        ),
        {
          client_id: config.pinterestAppId,
          client_secret: config.pinterestAppSecret,
          redirect_uri: config.redirectUrl,
          className: "pinterest-btn",
          ...pinterestProps
        }
      )}
      {config.useTwitter && renderSocialLogin(SocialLogin.LoginSocialTwitter, SocialLoginButtons.TwitterLoginButton, {
        client_id: config.twitterAppId,
        redirect_uri: config.redirectUrl,
        ...twitterProps
      })}
      {children}
    </Flex>
  )
}