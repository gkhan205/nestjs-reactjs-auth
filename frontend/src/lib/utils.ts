import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { getFromLocalStorage } from "@/lib/local-storage.ts";
import { STORAGE_CONSTANTS } from "@/shared/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAuthenticated = () => {
  const token = getFromLocalStorage(STORAGE_CONSTANTS.accessToken);

  return !!token;
};
