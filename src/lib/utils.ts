import instance, { base_url } from "@/services/instance";
import { FetcherType } from "@/shared/types/common";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const queryFilter = (filter: object) => {
  //@ts-ignore
  const filterEntries = Object.entries(filter).filter(([_, value]) => {
    return (
      value !== undefined && value !== null && value !== "" && value !== "all"
    );
  });
  if (filterEntries.length === 0) {
    return "";
  }
  const filterString = filterEntries
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return `?${filterString}`;
};

export const fetcher = async ({
  url,
  data,
  authenticated = true,
  type,
  headers,
  onUploadProgress,
}: FetcherType) => {
  try {
    if (authenticated) {
      const response = await instance({
        method: type,
        url: url,
        data: data ? data : undefined,
        headers: headers,
        onUploadProgress: onUploadProgress,
      });
      return response.data;
    } else {
      const response = await axios({
        method: type,
        data: data ? data : undefined,
        url: `${base_url}${url}`,
        headers: headers,
      });
      return response.data;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};


export  const generate_pagination = (currentPage: number, lastPage: number) => {
  if (lastPage <= 5) {
    return Array.from({ length: lastPage }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5, "ellipsis", lastPage];
  }

  if (currentPage >= lastPage - 2) {
    return [
      1,
      "ellipsis",
      lastPage - 4,
      lastPage - 3,
      lastPage - 2,
      lastPage - 1,
      lastPage,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    lastPage,
  ];
};