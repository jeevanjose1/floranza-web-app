"use client";
import ProductCardWrapper from "@/components/common/product-card-wrapper";
import { calculate_product_price } from "@/lib/utils";
import { useGetFeaturedProducts } from "@/services/queries/home";

import React from "react";

export default function FeaturedProducts() {
  const { data: featured_product } = useGetFeaturedProducts();
  
  const filterd_data =
    featured_product?.data?.list?.map((item: any) => {
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
    featured_product?.data?.list?.length >0?
    <section className="container my-16 ppppppprrrr">
      <div className="mb-8">

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
            is_prebook={product?.is_pre_order}
            is_new={product?.is_new_product}
          />
        ))}
      </div>
    </section>:null
  );
}
