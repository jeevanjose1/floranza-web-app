import ProductDetails from "@/components/screen/product-details/product-details";
import { fetcher } from "@/lib/utils";
import { PRODUCT } from "@/shared/urls/products";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

type Props = { params: any };

export default async function Product({ params }: Props) {
  const param = await params;
  const slug = param.product_details;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["PRODUCT_DETAILS"],
    queryFn: () =>
      fetcher({
        type: "get",
        url: `${PRODUCT.PRODUCT_DETAILS}/${slug}`,
        authenticated: false,
      }),
    staleTime: Infinity,
  });


  return (
    <main className="font-lora my-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetails slug={slug}/>
      </HydrationBoundary>
    </main>
  );
}
