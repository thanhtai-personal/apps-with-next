export interface ISocialConfig {
  fbAppId?: string;
  ggAppId?: string;
  amazonAppId?: string;
  instagramAppId?: string;
  instagramAppSecret?: string;
  microsoftAppId?: string;
  linkedinAppSecret?: string;
  linkedinAppId?: string;
  githubAppId?: string;
  githubAppSecret?: string;
  pinterestAppId?: string;
  pinterestAppSecret?: string;
  twitterAppId?: string;
  twitterV2AppKey?: string;
  twitterV2AppSecret?: string;
  appleId?: string;
  tiktokClientKey?: string;

  useFacebook?: boolean;
  useGoogle?: boolean;
  useAmazon?: boolean;
  useInstagram?: boolean;
  useMs?: boolean;
  useLinkedin?: boolean;
  useGithub?: boolean;
  useTwitter?: boolean;
  usePinterest?: boolean;
  useApple?: boolean;
  useTiktok?: boolean;

  redirectUrl: string;
}