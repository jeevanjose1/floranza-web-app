import instance, { base_url } from "@/services/instance";
import { FetcherType } from "@/shared/types/common";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  getCookie,
} from 'cookies-next/client';

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
const cache = new Map<string, any>();

const cacheTimestamps = new Map<string, number>();

export const fetcher = async ({
  url,
  data,
  authenticated = true,
  type = "get",
  headers,
  onUploadProgress,
  cacheKey,
  cacheTime = 0, 
}: FetcherType) => {
  const key = cacheKey ?? `${type}:${url}:${JSON.stringify(data)}`;

  // Check for cached data
  if (type === "get" && cacheTime > 0) {
    const cached = cache.get(key);
    const timestamp = cacheTimestamps.get(key);

    if (cached && timestamp && Date.now() - timestamp < cacheTime) {
      return cached;
    }
  }

  try {
    const config = {
      method: type,
      url: authenticated ? url : `${base_url}${url}`,
      data,
      headers,
      onUploadProgress,
    };

    const response = authenticated
      ? await instance(config as any)
      : await axios(config as any);

    // Cache result if applicable
    if (type === "get" && cacheTime > 0) {
      cache.set(key, response.data);
      cacheTimestamps.set(key, Date.now());
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response ?? error;
    }
    console.log(error);
    
    throw new Error("Unexpected error occurred");
  }
};

export const generate_pagination = (currentPage: number, lastPage: number) => {
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

export function capitalize_first_letters(sentence: string) {
  return sentence
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}


export const  is_authenticated = ()=>{
       const token = getCookie('floranza-t-value')
       return token ? true : false
}