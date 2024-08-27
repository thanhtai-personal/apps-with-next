export interface ParsedUrl {
  protocol?: string;
  username?: string;
  password?: string;
  hostname: string;
  port?: string;
  path?: string;
  search?: string;
  hash?: string;
}
export const parse = (url: string) => {
  const protocolRegex =
    /^(?:(?<protocol>[^:/]+:))?(?::?\/\/)?(?:(?<username>[^/:]*)(?::(?<password>[^@]*))?@)?(?:(?<hostname>[\w._-]*))?(?::(?<port>\d*))?(?:(?<path>\/?[^?]*))?(?:(?<search>\?[^#]*))?(?:(?<hash>#.*))?$/;

  const match = protocolRegex.exec(url)?.groups;

  if (!match) {
    return;
  }

  return match as unknown as ParsedUrl;
};

export const isSsl = (protocol: string) => {
  return [
    "https:",
    "rediss:",
    "wss:",
    "wss+unix:",
    "https+unix:",
    "rediss+unix:",
  ].includes(protocol);
};

export const parseURLHash = (url: string) => {
  // Sample URL
  // https://192.168.137.1:5173/#tgWebAppData=query_id%3DAAHccHQuAAAAANxwdC4Zz58v%26user%3D%257B%2522id%2522%253A779383004%252C%2522first_name%2522%253A%2522Kai.R%2522%252C%2522last_name%2522%253A%2522%2522%252C%2522username%2522%253A%2522kakashi0506%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26auth_date%3D1721545075%26hash%3D5cc8fbba81e0e41c34e4e72048f32c6007f217923e5e40f65aa3cbe336b33ad6&tgWebAppVersion=7.6&tgWebAppPlatform=tdesktop&tgWebAppBotInline=1&tgWebAppThemeParams=%7B%22accent_text_color%22%3A%22%236ab2f2%22%2C%22bg_color%22%3A%22%2317212b%22%2C%22button_color%22%3A%22%235288c1%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22destructive_text_color%22%3A%22%23ec3942%22%2C%22header_bg_color%22%3A%22%2317212b%22%2C%22hint_color%22%3A%22%23708499%22%2C%22link_color%22%3A%22%236ab3f3%22%2C%22secondary_bg_color%22%3A%22%23232e3c%22%2C%22section_bg_color%22%3A%22%2317212b%22%2C%22section_header_text_color%22%3A%22%236ab3f3%22%2C%22section_separator_color%22%3A%22%23111921%22%2C%22";
  // https://192.168.137.1:5173/#tgWebAppData=user%3D%257B%2522id%2522%253A7179933476%252C%2522first_name%2522%253A%2522Kim%2522%252C%2522last_name%2522%253A%2522Anh%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D3733036199270869480%26auth_date%3D1721902162%26hash%3Daec420b4df490f0ef9d70b2c0fe1ce352c0cebba11b0da20236a5c6b75f01b3d&tgWebAppVersion=7.6&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D
  const hash = url.split('#')?.at(1);
  if (!hash) return null;

  const paramsString = hash.split('&').map(param => param.split('=')).reduce((acc, [key, value]) => {
    if (key && value) {
      acc[key] = decodeURIComponent(value.replace(/\+/g, ' '));
    }
    return acc;
  }, {});

  return paramsString;
}