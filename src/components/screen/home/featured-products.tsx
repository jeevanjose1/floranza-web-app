"use client";
import ProductCardTwo from "@/components/common/product-card-two";
import ProductCardWrapper from "@/components/common/product-card-wrapper";
import { calculate_product_price } from "@/lib/utils";
import { useGetFeaturedProducts } from "@/services/queries/home";

import React from "react";

export default function FeaturedProducts() {
  const { data: featured_product, isPending } = useGetFeaturedProducts();
  const filterd_data =
    featured_product?.data?.map((item: any) => {
      return {
        id: item?.id,
        title: item?.name,
          price: calculate_product_price(item),
        image: item?.images?.large,
        variations: item?.variations,
        slug: item?.slug,
      };
    }) || [];

  return (
    <section className="container my-16 ppppppprrrr">
      <div className="mb-8">
        {/* <h2 className="text-main text-center tablet:text-lg font-medium font-grate-vibes">
          Floranza Fashion Boutique
        </h2> */}
        <h1 className="text-2xl tablet:text-3xl font-lora font-semibold text-center">
          Featured Products
        </h1>
      </div>
      <div className="grid grid-cols-2 font-poppins tablet-lg:grid-cols-3 laptop:grid-cols-4 gap-3 tablet:gap-6">
        {filterd_data?.map((product: any) => (
          <ProductCardWrapper
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            variation={product.variations}
            slug={product.slug}
            id={product?.id}
          />
        ))}
      </div>
    </section>
  );
}
