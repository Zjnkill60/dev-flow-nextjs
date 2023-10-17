import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeAgo(date: Date) {
  const now = new Date();
  const diff = Number(now) - Number(date);

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (diff < minute) {
    const seconds = Math.round(diff / 1000);
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else if (diff < hour) {
    const minutes = Math.round(diff / minute);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (diff < day) {
    const hours = Math.round(diff / hour);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (diff < month) {
    const days = Math.round(diff / day);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (diff < year) {
    const months = Math.round(diff / month);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.round(diff / year);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
}

export function shortenNumber(number: number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number.toString();
  }
}
