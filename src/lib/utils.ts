import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ellipsify(str = "", len = 4, delimiter = "..") {
  const strLen = str.length;
  const limit = len * 2 + delimiter.length;

  return strLen >= limit ? str.substring(0, len) + delimiter + str.substring(strLen - len, strLen) : str;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export function getPosition(position: number) {
  const j = position % 10,
    k = position % 100;

  if (j === 1 && k !== 11) return `${position}st`;
  if (j === 2 && k !== 12) return `${position}nd`;
  if (j === 3 && k !== 13) return `${position}rd`;
  return `${position}th`;
}

export function arrayContains(array: string[], value: string) {
  return array.map((arr) => arr.toLowerCase()).includes(value.toLowerCase());
}
