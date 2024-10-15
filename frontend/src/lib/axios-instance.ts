import axios from "axios";

import { clearStorage, getFromLocalStorage } from "@/lib/local-storage.ts";
import { STORAGE_CONSTANTS } from "@/shared/constants";

const API_URL: string = import.meta.env.VITE_API_URL as string;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config: any) => {
  const token = getFromLocalStorage(STORAGE_CONSTANTS.accessToken);

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token || ""}`,
    },
  };
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      clearStorage();
      if (!error.response.config.url.includes("login")) {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
