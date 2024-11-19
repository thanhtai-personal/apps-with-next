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
