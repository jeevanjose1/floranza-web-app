"use client";

import ProductCardOne from "@/components/common/product-card-one";
import { Button } from "@/components/ui/button";
import { useGetLatestProducts } from "@/services/queries/home";
import React from "react";

export default function LatestProducts() {
  const { data: latest_products } = useGetLatestProducts();
  const filterd_data = latest_products?.data?.map((item: any) => {
    return {
      id: item?.id,
      title: item?.name,
      price: {
        min: item?.is_variation
          ? item?.variations?.[0]?.reg_price
          : item?.reg_price,
        max: item?.is_variation
          ? item?.item?.variations?.[0]?.sale_price
          : item?.sale_price,
      },

      image: item?.images?.large,
      variations: item?.variations,
      slug: item?.slug,
    };
  });

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
          />
        ))}
      </div>
      <div className="w-full flex justify-center-safe mt-6">
        <Button
          variant={"outline"}
          className="rounded-sm hover:bg-main hover:text-white cursor-pointer"
        >
          Load More
        </Button>
      </div>
    </section>
  );
}
