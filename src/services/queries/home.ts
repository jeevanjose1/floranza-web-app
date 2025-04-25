import { fetcher } from "@/lib/utils";
import { HOME } from "@/shared/urls/home";
import { useQuery } from "@tanstack/react-query";

const useGetSlide = () => {
  return useQuery({
    queryKey: ["SLIDE"],
    queryFn: () =>
      fetcher({
        type: "get",
        url: HOME.SLIDE,
        authenticated: false,
      }),
  });
};

const useGetLatestProducts = () => {
  return useQuery({
    queryKey: ["LATEST_PRODUCTS"],
    queryFn: () =>
      fetcher({
        type: "get",
        url: HOME.LATEST_PRODUCTS,
        authenticated: false,
      }),
  });
};

const useGetFeaturedProducts = () => {
  return useQuery({
    queryKey: ["FEATURED_PRODUCTS"],
    queryFn: () =>
      fetcher({
        type: "get",
        url: HOME.FEATURED_PRODUCTS,
        authenticated: false,
      }),
  });
};

const useGetMostSelleingProducts = () => {
  return useQuery({
    queryKey: ["MOST_SELLING_PRODUCTS"],
    queryFn: () =>
      fetcher({
        type: "get",
        url: HOME.MOST_SELLING,
        authenticated: false,
      }),
  });
};
const useGetCatogeries = () => {
  return useQuery({
    queryKey: ["CATOGERIES"],
    queryFn: () =>
      fetcher({
        type: "get",
        url: HOME.CATOGERIES,
        authenticated: false,
      }),
  });
};

export {
  useGetSlide,
  useGetLatestProducts,
  useGetFeaturedProducts,
  useGetMostSelleingProducts,
  useGetCatogeries,
};
