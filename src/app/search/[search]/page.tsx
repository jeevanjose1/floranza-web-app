
import React from "react";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetcher, queryFilter } from "@/lib/utils";
import { PRODUCT } from "@/shared/urls/products";
import ProductList from "@/components/screen/search/product-list";

type Props = { params: any,searchParams:any };

export default async function Product({ params,searchParams }: Props) {
  const param = await params;
  const queryParams = await searchParams;
   
  const slug = param.product;
  const search = param?.search?.replaceAll('-',' ');
  
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["PRODUCTS_LIST"],
    queryFn: () =>
      fetcher({
        type: "get",
        url: `${PRODUCT.PRODUCT_LIST}/${slug}/${queryFilter({
          page: queryParams?.page,
          per_page: queryParams?.per_page ||2,
          material:queryParams?.material,
          size:queryParams?.size,
          min_price:queryParams.min_price,
          max_price:queryParams.max_price,
          name:search
        })}`,
        authenticated: false,
      }),
  });

 
  return (
    
      <div className="container-md">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductList search={search} slug={slug} queryParams={queryParams} />
        </HydrationBoundary>
      </div>
    
  );
}
