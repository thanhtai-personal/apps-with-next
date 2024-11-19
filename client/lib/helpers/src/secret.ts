import { ensure } from "./ensure";

export const maskEmail = (email: string, mask = "•", visibleChars = 1) => {
  const [name, domain] = email.split("@");
  ensure(name);
  const visibleName = name.slice(0, visibleChars);
  return `${visibleName}${mask.repeat(name.length - visibleChars)}@${domain}`;
};

export const maskPhoneNumber = (
  phoneNumber: string,
  mask = "•",
  visibleDigits = 4,
) => {
  return `${mask.repeat(phoneNumber.length - visibleDigits)}${phoneNumber.slice(-visibleDigits)}`;
};
