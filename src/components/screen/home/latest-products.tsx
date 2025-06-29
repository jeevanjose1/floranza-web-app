"use client";

import Loader from "@/components/common/loader";
import ProductCardOne from "@/components/common/product-card-one";
import { Button } from "@/components/ui/button";
import { calculate_product_price } from "@/lib/utils";
import { useGetLatestProducts } from "@/services/queries/home";
import React from "react";

export default function LatestProducts() {
  const {
    data: latest_products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetLatestProducts();

  const flat_product = latest_products ? latest_products?.pages?.map((item: any) => item?.data?.list)?.flat() : [];

  const filterd_data =
    flat_product?.map((item: any) => {
      return {
        id: item?.id,
        title: item?.name,
        price: calculate_product_price(item),
        image: item?.images?.large,
        variations: item?.variations,
        slug: item?.slug,
        is_pre_order: item?.is_pre_order,
        is_new_product: item?.is_new_product
      };
    }) || [];

  return (
    <section className="container my-16">
      <div className="mb-8">
        <h2 className="text-main text-center tablet:text-lg font-medium font-grate-vibes">
          Floranza Fashion Boutique
        </h2>
        <h1 className="text-2xl tablet:text-3xl font-lora font-semibold text-center">
          Latest Products
        </h1>
      </div>
      <div className="grid grid-cols-2 font-poppins tablet-lg:grid-cols-3 laptop:grid-cols-4 gap-3 tablet:gap-6">
        {filterd_data?.map((product: any) => (
          <ProductCardOne
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            variation={product.variations}
            slug={product?.slug}
            id={product.id}
            is_prebook={product?.is_pre_order}
            is_new={product?.is_new_product}
          />
        ))}
      </div>

      {hasNextPage && <div className="w-full flex justify-center mt-6">
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          variant={"outline"}

          className="rounded-sm hover:bg-main font-lora hover:text-white cursor-pointer"
        >
          {isFetchingNextPage ? <Loader /> : "Load More Product"}
        </Button>
      </div>}

    </section>
  );
}