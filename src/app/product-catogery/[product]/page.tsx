
import React from "react";

import ProductList from "@/components/screen/product-list/product-list";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetcher, queryFilter } from "@/lib/utils";
import { PRODUCT } from "@/shared/urls/products";

type Props = { params: any,searchParams:any };

export default async function Product({ params,searchParams }: Props) {
  const param = await params;
  const queryParams = await searchParams;
  
  const slug = param.product;
  const page_no = queryParams?.page;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["PRODUCTS_LIST"],
    queryFn: () =>
      fetcher({
        type: "get",
        url: `${PRODUCT.PRODUCT_LIST}/${slug}/${queryFilter({
          page: page_no,
          per_page: queryParams?.per_page ,
          material:queryParams?.material,
          size:queryParams?.size,
          min_price:queryParams.min_price,
          max_price:queryParams.max_price
        })}`,
        authenticated: false,
      }),
  });

  return (
    
      <div className="container-md">
        <HydrationBoundary  state={dehydrate(queryClient)}>
          <ProductList slug={slug} queryParams={queryParams} />
        </HydrationBoundary>
      </div>
    
  );
}
