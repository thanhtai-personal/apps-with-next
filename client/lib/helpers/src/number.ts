export type SupportedUnit =
  | "acre"
  | "bit"
  | "byte"
  | "celsius"
  | "centimeter"
  | "day"
  | "degree"
  | "fahrenheit"
  | "fluid-ounce"
  | "foot"
  | "gallon"
  | "gigabit"
  | "gigabyte"
  | "gram"
  | "hectare"
  | "hour"
  | "inch"
  | "kilobit"
  | "kilobyte"
  | "kilogram"
  | "kilometer"
  | "liter"
  | "megabit"
  | "megabyte"
  | "meter"
  | "microsecond"
  | "mile"
  | "mile-scandinavian"
  | "milliliter"
  | "millimeter"
  | "millisecond"
  | "minute"
  | "month"
  | "nanosecond"
  | "ounce"
  | "percent"
  | "petabyte"
  | "pound"
  | "second"
  | "stone"
  | "terabit"
  | "terabyte"
  | "week"
  | "yard"
  | "year";

export type UnitDisplay = "long" | "short" | "narrow";

let defaultNumberOptions: Intl.NumberFormatOptions = {};

export const setNumberOptions = (options: Intl.NumberFormatOptions) => {
  defaultNumberOptions = options;
};

declare global {
  interface Number {
    locale: string;
    format(): string;
    formatUnit(unit: SupportedUnit, display?: UnitDisplay): string;
    formatCurrency(
      currency: string,
      options?: {
        currencySign?: "standard" | "accounting";
        currencyDisplay?: "symbol" | "code" | "name";
      },
    ): string;
  }
}

const intlFormat = (value: number, options = defaultNumberOptions) => {
  return new Intl.NumberFormat(value.locale, options).format(value);
};

export const formatNumber = (value: number, options = defaultNumberOptions) => {
  return intlFormat(value, options);
};

export const formatToUnit = (
  value: number,
  unit: SupportedUnit,
  display: UnitDisplay = "long",
) => {
  return intlFormat(value, {
    style: "unit",
    unit,
    unitDisplay: display,
  });
};

export const formatToCurrency = (
  value: number,
  currency: string,
  options: {
    currencySign?: "standard" | "accounting";
    currencyDisplay?: "symbol" | "code" | "name";
  } = {},
) => {
  const { currencySign = "standard", currencyDisplay = "symbol" } = options;
  return intlFormat(value, {
    style: "currency",
    currency,
    currencySign,
    currencyDisplay,
  });
};

export const isNumberString = (value: string) => {
  return !isNaN(+value);
};

export const isInt = (value: number) => {
  return value % 1 === 0;
};

export const isFloat = (value: number) => {
  return value % 1 !== 0;
};

Number.prototype.format = function (options = defaultNumberOptions) {
  return formatNumber(this.valueOf(), options);
};

Number.prototype.formatCurrency = function (
  currency: string,
  options?: {
    currencySign?: "standard" | "accounting";
    currencyDisplay?: "symbol" | "code" | "name";
  },
) {
  return formatToCurrency(this.valueOf(), currency, options);
};

Number.prototype.formatUnit = function (
  unit: SupportedUnit,
  display: UnitDisplay = "long",
) {
  return formatToUnit(this.valueOf(), unit, display);
};

const billion = 1000000000;
const million = 1000000;


export const formatMoney = (amount: number, isShort?: boolean) => {
  // Create a number formatter instance
  const formatter = new Intl.NumberFormat('vi-VN', {
    // style: 'currency',
    currency: 'VND', // Change currency as needed
    minimumFractionDigits: 0,
  });
  let usingAmount = amount;
  if (isShort) {
    if (amount > billion) {
      usingAmount = amount / billion
    } else if (amount > million) {
      usingAmount = amount / million
    }
  }

  let amountString = formatter.format(usingAmount);

  // Format the amount as currency
  return `${amountString} ${isShort ? amount >= billion ? "tỷ " : amount >= million ? "triệu" : "" : ""}`;
};

