
import React from "react";

import ProductList from "@/components/screen/product-list/product-list";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetcher, queryFilter } from "@/lib/utils";
import { PRODUCT } from "@/shared/urls/products";

type Props = { params: any };

export default async function Product({ params }: Props) {
  const param = await params;
  const slug = param.product;
  const page_no = param?.slug?.[1];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["PRODUCTS_LIST"],
    queryFn: () =>
      fetcher({
        type: "get",
        url: `${PRODUCT.PRODUCT_LIST}/${slug}/${queryFilter({
          page: page_no,
          per_page: 2,
        })}`,
        authenticated: false,
      }),
    staleTime: Infinity,
  });

  return (
    < >
      <div className="container-md">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductList page={page_no} slug={slug} />
        </HydrationBoundary>
      </div>
    </>
  );
}
