import moment from "moment";
import BigNumber from "bignumber.js";
BigNumber.config({ EXPONENTIAL_AT: 200 });

const BILION = 1000000000,
  MILION = 1000000,
  THOUSAND = 1000;

export const formatTokenNumber = (
  num: number,
  fraction?: number,
  useExponential = false,
  maxFraction?: number
) => {
  num = +num;
  if (Math.abs(num) <= 0.00001) {
    num = 0;
  }
  if (useExponential) {
    return num.toExponential(fraction || 3);
  }

  let _fraction =
    fraction !== undefined
      ? getPriceFractionFormat(num, fraction)
      : getPriceFractionFormat(num, 2);

  if (fraction === 0) {
    _fraction = 0;
  }
  if (_fraction > (maxFraction ? maxFraction : 5)) {
    _fraction = maxFraction ? maxFraction : 5;
  }

  const _temp = +`10e${_fraction - 1}`;
  const roundedNumber = Math.floor(num * _temp) / _temp;

  return (Number(roundedNumber) || 0).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: _fraction > 18 ? 18 : _fraction,
  });
};

export const formatTokenNumberAsString = (
  num: number,
  fraction?: number,
  useExponential = false,
  maxFraction?: number
) => {
  let unit = "";
  let tokenValue = formatTokenNumber(
    num,
    fraction,
    useExponential,
    maxFraction
  );
  if (num > BILION) {
    unit = "B";
    tokenValue = formatTokenNumber(
      num / BILION,
      fraction,
      useExponential,
      maxFraction
    );
  } else if (num > MILION) {
    unit = "M";
    tokenValue = formatTokenNumber(
      num / MILION,
      fraction,
      useExponential,
      maxFraction
    );
  } else if (num > THOUSAND) {
    unit = "K";
    tokenValue = formatTokenNumber(
      num / THOUSAND,
      fraction,
      useExponential,
      maxFraction
    );
  }
  return `${tokenValue}${unit}`;
};

export const clipAddressText = (
  address: string,
  first?: number,
  last?: number
) => {
  if (!address) {
    return "";
  }
  return `${address.slice(0, first || 18)}...${last === 0 ? "" : address.slice(-(last || 8))
    }`;
};

export const getErrorMessageFromResponse = (err) => {
  if (
    err.innerError &&
    err.innerError.message &&
    err.innerError.message.includes("rpc")
  ) {
    const match = err.innerError.message.match(/"message": "Error:(.+)",/gim);
    if (match && match.length > 0) {
      return match[0];
    }
  }
  if (typeof err === "string") {
    return err;
  }

  let finalErr = (err && err.data && err.data.message) || (err && err.message);
  if (typeof finalErr !== "string") {
    finalErr = "Something wrong, please try again later";
  }
  return finalErr.toString();
};

export const diffDuration = (now, time) => {
  var leftTime = time - now;
  if (leftTime < 0) {
    return "00:00:00";
  }
  const _duration = moment.duration(leftTime, "seconds");

  const hour =
    _duration.hours() < 10 ? `0${_duration.hours()}` : _duration.hours();
  const min =
    _duration.minutes() < 10 ? `0${_duration.minutes()}` : _duration.minutes();
  const sec =
    _duration.seconds() < 10 ? `0${_duration.seconds()}` : _duration.seconds();
  if (Math.floor(_duration.asDays()) > 0) {
    return (
      Math.floor(_duration.asDays()) + " days " + hour + ":" + min + ":" + sec
    );
  } else {
    return hour + ":" + min + ":" + sec;
  }
};

export const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getValueAsEther = (valueAsWei, decimals) => {
  let num = new BigNumber(valueAsWei);
  let denom = new BigNumber(10).pow(decimals);
  let ans = num.dividedBy(denom);
  ans = ans.dp(8, BigNumber.ROUND_FLOOR);
  return ans.toNumber();
};

export const getValueAsWei = (valueAsEther, decimals) => {
  let num = valueAsEther * +`1e${decimals}`;
  return new BigNumber(num).toString(10);
};

export const getPriceFractionFormat = (price, deicmals?: number) => {
  let fractional =
    Math.floor(1 / price).toString().length + (deicmals ? deicmals - 1 : 3);
  return fractional;
};

export const simpleFormatTokenNumber = (num: number, fraction?: number) => {
  const _fraction =
    fraction !== undefined
      ? getPriceFractionFormat(num, fraction)
      : getPriceFractionFormat(num, 2);

  return (Number(num) || 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: _fraction > 18 ? 18 : _fraction,
  });
};

export const formatDollar = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const waitMs = (msDuration: number) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(null);
    }, msDuration);
  });
};

export const getPercentChange = (newValue: number, oldValue: number) => {
  if (!newValue) {
    newValue = 0;
  }
  if (!oldValue) {
    oldValue = 0;
  }
  if (Math.abs(newValue) < 0.00000001) {
    newValue = 0;
  }
  if (Math.abs(oldValue) < 0.00000001) {
    oldValue = 0;
  }

  let changeValue = newValue - oldValue;
  if (oldValue) {
    return oldValue < 0 ? 100 : (changeValue * 100) / oldValue;
  } else {
    if (changeValue > 0) {
      return 100;
    } else if (changeValue < 0) {
      return -100;
    } else {
      return 0;
    }
  }
};

export const formatLongNumber = (num, factor?: number) => {
  num = +num;
  if (!num) {
    return 0;
  }
  if (num < 100000) {
    return formatTokenNumber(num, factor);
  }

  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
};

export const getDisplayNameOfUser = (
  user,
  isGetFullAddress?,
  isOnlyGetUsername?
) => {
  if (!user) {
    return "";
  }
  const userDetail = user.walletDetail || user || {};
  if (userDetail.ens) {
    return userDetail.ens.length >= 20
      ? clipAddressText(userDetail.ens, 10, 5)
      : userDetail.ens;
  }
  if (userDetail.twitterUsername) {
    return `X-${userDetail.twitterUsername}`;
  }
  if (userDetail.teleUsername) {
    return `T-${userDetail.teleUsername}`;
  }
  if (userDetail.username) {
    return `${userDetail.username}`;
  }
  if (isOnlyGetUsername) {
    return "";
  }
  return isGetFullAddress ? user.wallet : clipAddressText(user.wallet, 4, 4);
};

export const formatPercentNumStr = (num, decimal?) => {
  // if (!num) {
  //   return ``;
  // }
  return `${num > 0 ? "+" : num < 0 ? "-" : ""}${formatLongNumber(
    Math.abs(num),
    decimal ? decimal : 2
  )}%`;

};

export const isValidURL = (str) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-zA-Z0-9\\-\\._~%!$&'()*+,;=]+)@)?" + // user:pass authentication
    "(([a-zA-Z0-9\\-\\._~%]+)\\.)*" + // subdomain
    "([a-zA-Z0-9\\-\\._~%]+)\\.[a-zA-Z]{2,6}|" + // domain name and extension
    "((\\d{1,3}\\.){3}\\d{1,3})|" + // OR IPv4
    "\\[([a-fA-F0-9:.]+)\\])" + // OR IPv6
    "(\\:\\d+)?" + // port
    "(\\/[-a-zA-Z0-9\\@:%_\\+.~#?&//=]*)?" + // path
    "(\\?[;&a-zA-Z0-9\\@:%_\\+.~#?&//=]*)?" + // query string
    "(\\#[-a-zA-Z0-9\\@:%_\\+.~#?&//=]*)?$",
    "i"
  ); // fragment locator

  if (!pattern.test(str)) {
    return false;
  }

  try {
    new URL(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const convertChartToLineChartCompData = (chartMap, valueField) => {
  const chartMapValues = Object.values(chartMap).sort(
    (a: any, b: any) => a.time - b.time
  );
  let first: any = chartMapValues[0];
  let last: any = chartMapValues[chartMapValues.length - 1];

  let results: any[] = [];

  if (first && last) {
    let crrTime = first.time;
    let crrValue = first[valueField];

    for (; ;) {
      if (crrTime > last.time) {
        break;
      }
      results.push({
        time: moment(new Date(crrTime)).format("YYYY-MM-DD"),
        value: crrValue,
      });
      crrTime += 24 * 3600 * 1000;
      if (chartMap[crrTime]) {
        crrValue = chartMap[crrTime][valueField];
      }
    }
  }
  return results;
};

const TIME_CONFIG = {
  seconds: 1,
  minutes: 60,
  hour: 3600,
  day: 86400,
} as any;

export const convertTimeToString = (time = 0) => {
  if (!time) {
    return `0 seconds`;
  }

  let key = "";
  let value = 0;
  for (const i in TIME_CONFIG) {
    if (time >= TIME_CONFIG[i]) {
      key = i;
      value = time / TIME_CONFIG[i];
    }
  }

  return `${value.toFixed(1)} ${key}`;
};

export const getProfileImageOfUser = (user, isGray?) => {
  const detail = user.walletDetail;
  if (!detail || !detail.avatars || !detail.avatars.length) {
    return isGray ? `/images/no-avatar-gray.png` : `/images/no-avatar.png`;
  } else {
    const find = detail.avatars.find((item) => item.includes("/avatar"));
    return find || `/images/no-avatar.png`;
  }
};

export const roundDown8Decimal = (value) => {
  let num = new BigNumber(value).toString();
  num = num.slice(0, num.indexOf(".") + 9);
  return Number(num);
};

export const getLockerContractName = (
  type: "DCT" | "ETH" | "wstETH" | "weETH" | "ezETH"
) => {
  if (type === "DCT") {
    return "DCT_LOCKER";
  } else if (type === "ETH") {
    return "ETH_LOCKER";
  } else if (type === "wstETH") {
    return "wstETH_LOCKER";
  } else if (type === "weETH") {
    return "weETH_LOCKER";
  } else if (type === "ezETH") {
    return "ezETH_LOCKER";
  } else {
    throw new Error(`not support ${type} Locker`);
  }
};

export const isGETH = (type: "DCT" | "ETH" | "wstETH" | "weETH" | "ezETH") => {
  if (type === "DCT") {
    return false;
  } else {
    return true;
  }
};

export const getUserStakeETHFieldName = (
  tokenType: "DCT" | "ETH" | "wstETH" | "weETH" | "ezETH",
  field: "amount" | "duration" | "startedAt"
) => {
  let fieldUppercaseFirstLetter =
    field.charAt(0).toUpperCase() + field.slice(1);
  if (tokenType === "DCT") {
    return `stakeDct${fieldUppercaseFirstLetter}`;
  } else if (tokenType === "ETH") {
    return field;
  } else {
    return `${tokenType}${fieldUppercaseFirstLetter}`;
  }
};

export const formatMoney = (
  amount: number,
  currencySymbol: string = "$",
  decimalDigits: number = 2,
  decimalSeparator: string = ".",
  thousandsSeparator: string = ","
): string => {
  const formattedAmount = amount.toFixed(decimalDigits);
  const parts = formattedAmount.split(".");
  const integerPart = parts?.[0]?.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandsSeparator
  );
  const decimalPart = parts.length > 1 ? decimalSeparator + parts[1] : "";

  return currencySymbol + integerPart + decimalPart;
};

export const calculateTotal = (
  data: any[] = [],
  key: string = "tokenBuyed"
) => {
  return data.reduce((prev, current) => prev + current[key] || 0, 0);
};

export const getSecondString = (seconds: number, isClockNumber = true) => {
  if (seconds < 10) return `0${seconds}`;
  if (seconds > 59 && isClockNumber) return `0${seconds % 60}`;
  return `${seconds}`;
};

export const numberToString = (value: number, digit: number = 2) => {
  const digits = ["0", "00", "000", "0000"];
  if (value > -10 && value < 10) return `${digits[digit - 2]}${value}`;
  if (digit > 1 && value > -100 && value < 100)
    return `${digits[digit - 3]}${value}`;
  if (digit > 2 && value > -1000 && value < 1000)
    return `${digits[digit - 4]}${value}`;
  if (digit > 3 && value > -10000 && value < 10000)
    return `${digits[digit - 5]}${value}`;
  return value;
};

export const formatFullDate = (date: any, opt?: any) => {
  try {
    const currentDate = new Date(date);

    // Define options for date and time formatting
    const options = opt || {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    // Format the date using Intl.DateTimeFormat with options
    const formattedDateString = new Intl.DateTimeFormat("en-US", options as any).format(
      currentDate
    );

    return formattedDateString;
  } catch (error) {
    return ""
  }
};

export const formatDateAsTime = (date: any) => {
  try {
    const currentDate = new Date(date);

    // Define options for date and time formatting
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };

    // Format the date using Intl.DateTimeFormat with options
    const formattedDateString = new Intl.DateTimeFormat("en-US", options as any).format(
      currentDate
    );

    return formattedDateString;
  } catch (error) {
    console.log("error", error)
  }
};

export const getValueAsETH = (MAP_TOKEN_WITH_VALUE_AS_ETH, token, value) => {
  const ratio = MAP_TOKEN_WITH_VALUE_AS_ETH[token] || 0;
  return value * ratio;
};

export const getValueAsETHFromTS = (MAP_TOKEN_WITH_VALUE_AS_ETH, tsField) => {
  let total = 0;
  for (let token of Object.keys(tsField)) {
    const ratio = MAP_TOKEN_WITH_VALUE_AS_ETH[token] || 0;
    // const DEMI = new BigNumber('10000');
    // const ratioBN = new BigNumber((ratio * 10000).toFixed(0));
    // const valueAsETH = value.multipliedBy(ratioBN).dividedToIntegerBy(DEMI);
    const value = tsField[token] || 0;
    total += value * ratio;
  }
  return total;
};

export const makeAddressUrl = (NETWORKS_CONFIGS, CURRENT_CHAIN, address: string) => {
  return `${NETWORKS_CONFIGS[CURRENT_CHAIN].EXPLORER}/address/${address}`
}

export const makeTxAddressUrl = (NETWORKS_CONFIGS, CURRENT_CHAIN, address: string) => {
  return `${NETWORKS_CONFIGS[CURRENT_CHAIN].EXPLORER}/tx/${address}`
}

export const getRank = (rank, dctScore) => {
  if (rank === 1) {
    return {
      name: "GOAT",
      image: "goat"
    }
  } else if (rank <= 10) {
    return {
      name: "OG",
      image: "og"
    }
  } else {
    if (dctScore >= 5120) {
      return {
        name: "Legendary",
        image: "legendary",
      }
    } else if (dctScore >= 2560) {
      return {
        name: "Godlike",
        image: "godlike",
        nextRank: 5120
      }
    } else if (dctScore >= 1280) {
      return {
        name: "Epic",
        image: "epic",
        nextRank: 2560
      }
    } else if (dctScore >= 640) {
      return {
        name: "Illustrious",
        image: "illustrious",
        nextRank: 1280
      }
    } else if (dctScore >= 320) {
      return {
        name: "Eminent",
        image: "eminent",
        nextRank: 640
      }
    } else if (dctScore >= 160) {
      return {
        name: "Radiant",
        image: "radiant",
        nextRank: 320
      }
    } else if (dctScore >= 80) {
      return {
        name: "Glorious",
        image: "glorious",
        nextRank: 160
      }
    } else if (dctScore >= 40) {
      return {
        name: "Big-time",
        image: "big-time",
        nextRank: 80
      }
    } else if (dctScore >= 20) {
      return {
        name: "Famous",
        image: "famous",
        nextRank: 40
      }
    } else if (dctScore >= 10) {
      return {
        name: "Trustworthy",
        image: "trustworthy",
        nextRank: 20
      }
    } else {
      return {
        name: "Follower",
        image: "follower",
        nextRank: 10
      }
    }
  }
}

export const roundTime = (time: number, dividedBy: number) => {
  return Math.floor(time / dividedBy) * dividedBy
}