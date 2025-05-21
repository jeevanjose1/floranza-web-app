import { fetcher, queryFilter } from "@/lib/utils";
import { PRODUCT } from "@/shared/urls/products";
import { useQuery } from "@tanstack/react-query";

const useGetProductList = (payload: any) => {
  return useQuery({
    queryKey: ["PRODUCTS_LIST",payload],
    queryFn: () =>
      fetcher({
        type: "get",
        url: `${PRODUCT.PRODUCT_LIST}/${payload.slug}${queryFilter(
          payload?.filter
        )}`,
        authenticated: false,
      }),
  });
};
const useGetProductListSearch = (payload: any) => {
  return useQuery({
    queryKey: ["PRODUCTS_LIST_SEARCH",payload],
    queryFn: () =>
      fetcher({
        type: "get",
        url: `${PRODUCT.SEARCH}/${queryFilter(
          payload?.filter
        )}`,
        authenticated: false,
      }),
  });
};
const useGetProductDetails = (payload: any) => {
  return useQuery({
    queryKey: ["PRODUCT_DETAILS"],
    queryFn: () =>
      fetcher({
        type: "get",
        url: `${PRODUCT.PRODUCT_DETAILS}/${payload}`,
        authenticated: false,
      }),
      retry:false,
  });
};

export { useGetProductList, useGetProductDetails ,useGetProductListSearch};
