"use client";

import ProductCardTwo from "@/components/common/product-card-two";
import { Separator } from "@/components/ui/separator";
import React from "react";
import DetailsSection from "./details-section";
import ActionSection from "./action-section";
import ImageSection from "./image-section";
import { useGetProductDetails } from "@/services/queries/product";
import parse from "html-react-parser";

type Props = { slug: string };

export default function ProductDetails({ slug }: Props) {
  const { data: product_details } = useGetProductDetails(slug);
  const product = product_details?.data?.product;
  const catogery = product_details?.data?.category;
  const related = product_details?.data?.relatedProducts;
  console.log('====================================');
  console.log(product_details);
  console.log('====================================');
  const filterd_data = related?.map((item: any) => {
    return {
      id: item?.id,
      title: item?.name,
      price: {
        min: item?.variations?.[0]?.reg_price,
        max: item?.item?.variations?.[0]?.sale_price,
      },
      image: item?.images?.large,
      variations: item?.variations,
      slug: item?.slug,
    };
  });
  return (
    <>
      <div className="container-md flex flex-col tablet-lg:flex-row gap-6  ">
        <div className="flex-1 ">
          <ImageSection images_data={[product?.images?.large]} />
        </div>
        <div className="flex-1">
          <div className="flex items-center flex-wrap gap-2.5 text-sm mb-2">
            <p>Home</p> /<p>{catogery?.name}</p>/
            <p className="tablet:inline-block hidden">{product?.name}</p>
          </div>
          <div className="mb-3">
            <h1 className=" text-2xl tablet-lg:text-3xl font-medium">
              {product?.name}
            </h1>
          </div>
          <div className="mb-3">
            <h3 className="text-main font-semibold text-xl">
              {product?.variations?.[0]?.sale_price}
            </h3>
          </div>
          <div className="mb-4">
            <h3 className="text-blue-400 font-semibold text-sm">Size Chart</h3>
          </div>

          <div className="mb-4">
            <div className="text-sm font-medium text-muted-foreground/90 mb-5">
              {parse(product?.description || "")}
            </div>
          </div>

          <Separator className="my-5" />
          <ActionSection product={product} />
        </div>
      </div>
      <DetailsSection product={product} />
      <Separator className="mb-4 tablet-lg:mt-6" />

      <div className="container-md">
        <h3 className="text-lg font-medium mb-4">Related products</h3>

        <div className="grid grid-cols-2 mb-12 font-poppins tablet-lg:grid-cols-3 laptop:grid-cols-4 gap-x-3 gap-y-6 tablet:gap-6">
          {filterd_data?.slice(0, 4).map((product: any) => (
            <ProductCardTwo
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              variation={product.variations}
              slug={product.slug}
            />
          ))}
        </div>
      </div>
    </>
  );
}
