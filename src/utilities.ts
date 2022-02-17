import { IntlShape } from "@formatjs/intl";
import { selectUnit } from "@formatjs/intl-utils";
import { IntlMessageFormat } from "intl-messageformat";
import jsonpointer from "jsonpointer";

export function formatRelativeTimestamp(
  intl: IntlShape<string>,
  timestamp: number
) {
  const diff = selectUnit(timestamp);
  return intl.formatRelativeTime(diff.value, diff.unit, { numeric: "auto" });
}

export function formatMessage(
  message: string,
  locale: string,
  variables: Record<string, any>
) {
  return new IntlMessageFormat(message, locale).format(variables);
}

//TODO: any other messages if we need them
export function getCleanErrorMessage(error) {
  if (error?.keywordLocation?.includes("minLength")) {
    return "Cannot be empty";
  }
  if (
    error?.keywordLocation?.includes("email") &&
    error?.keywordLocation?.includes("format")
  ) {
    return "Must be a valid email address";
  }
  if (error?.keywordLocation?.includes("minimum")) {
    const minimum = error?.error?.slice(-1);
    if (error?.instanceLocation?.includes("numTechnicians")) {
      return `Must have a minimum of 2 full time techs to fit ICP`;
    } else if (error?.instanceLocation?.includes("numOfOfficeEmployees")) {
      return `Must have a minimum of 1 full time office staff to fit ICP`;
    } else {
      return `Must be atleast ${minimum}`;
    }
  }
  return "Cannot be empty";
}

export function setFormData(formData, inputs) {
  formData?.forEach((value, key) => {
    const type = inputs.find((input) => {
      return input.name === key;
    })?.type;

    // TODO: implement more types / move this to an exported function
    if (type === "number") {
      jsonpointer.set(formData, key, asNumber(value) || 0);
    } else if (type === "checkbox" || type === "radio") {
      jsonpointer.set(formData, key, value === "on" ? true : false);
    } else {
      jsonpointer.set(formData, key, value);
    }
  });
}

export function asNumber(value: string): number | string {
  if (value === "") {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  if (/\.$/.test(value)) {
    // "3." can't really be considered a number even if it parses in js. The
    // user is most likely entering a float.
    return value;
  }
  if (/\.0$/.test(value)) {
    // we need to return this as a string here, to allow for input like 3.07
    return value;
  }
  const n = Number(value);
  const valid = typeof n === "number" && !Number.isNaN(n);

  if (/\.\d*0$/.test(value)) {
    // It's a number, that's cool - but we need it as a string so it doesn't screw
    // with the user when entering dollar amounts or other values (such as those with
    // specific precision or number of significant digits)
    return value;
  }

  return valid ? n : value;
}

// OLD STUFF BELOW HERE

/////////////////////////////////////
//////                           ////
/////  Color Utility Functions  /////
////                           //////
/////////////////////////////////////

export const cutHex = (hex) => {
  return hex.charAt(0) == "#" ? hex.substring(1) : hex;
};

export const cutRgb = (rgb) => {
  return rgb.substring(4, rgb.length - 1);
};

export const hexToRgb = (hex) => {
  const noHex = cutHex(hex);
  const r = parseInt(noHex.substring(0, 2), 16);
  const g = parseInt(noHex.substring(2, 4), 16);
  const b = parseInt(noHex.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

export const isHex = (string) => {
  return !!string.match(/^#[0-9a-f]{6}$/i);
};

export const isRgb = (string) => {
  const rgbArray = cutRgb(string).split(", ");
  if (rgbArray.length !== 3) return false;
  return rgbArray.every((x) => parseInt(x) >= 0 && parseInt(x) <= 255);
};

export const shadeColor = (color, percent) => {
  if (!isHex(color) && !isRgb(color)) return;
  const rgb = isHex(color) ? hexToRgb(color) : color;
  const decimalPercent = percent / 100;
  const shadedArray = cutRgb(rgb)
    .split(", ")
    .map((n) => {
      return Math.floor(parseInt(n) * (1 - decimalPercent));
    });
  return `rgb(${shadedArray.join(", ")})`;
};

/////////////////////
//////           ////
/////  Exports  /////
////           //////
/////////////////////

export const hasClass = (el, className) => {
  if (el.classList) return el.classList.contains(className);
  else
    return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
};

export const addClass = (el, className) => {
  if (el.classList) {
    el.classList.add(className);
  } else if (!hasClass(el, className)) {
    el.className += " " + className;
  }
};

export const removeClass = (el, className) => {
  if (el.classList) {
    el.classList.remove(className);
  } else if (hasClass(el, className)) {
    const reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
};

export const detectMobileSafari = () => {
  return /iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i.test(
    window.navigator.userAgent
  );
};

export const detectMobileChrome = () => {
  return window.navigator.userAgent.match("CriOS");
};

export const uuid = function b(a = undefined): string {
  return a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : // @ts-ignore
      // https://gist.github.com/jed/982883
      ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
};
