"use client";

import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import DetailsSection from "./details-section";
import ActionSection from "./action-section";
import ImageSection from "./image-section";
import { useGetProductDetails } from "@/services/queries/product";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/loader";
import ProductCardWrapper from "@/components/common/product-card-wrapper";
import { calculate_product_price } from "@/lib/utils";
import SizeChart from "./size-chart";

type Props = { slug: string };

export default function ProductDetails({ slug }: Props) {
  const {
    data: product_details,
    isLoading,
    error,
  } = useGetProductDetails(slug) as any;
  const [variationIndex, setVariationIndex] = useState<any>(null);
  const product = product_details?.data?.product;
  const catogery = product_details?.data?.category;
  const related = product_details?.data?.relatedProducts;
 
  const router = useRouter();

  const filterd_data = related?.map((item: any) => {
    return {
      id: item?.id,
      title: item?.name,
      price: calculate_product_price(item),
      image: item?.images?.large,
      variations: item?.variations,
      slug: item?.slug,
    };
  });

  const price = calculate_product_price(product, variationIndex)


  if (isLoading) {
    return (
      <div className="w-full h-100 flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (
    !isLoading &&
    (error?.data?.message === "Invalid Slug" || error?.status === 400)
  ) {
    router.push("/404");
    return null;
  }

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
              ₹{Math.round(Number(price.min)).toLocaleString("en-IN")}
              {price.max ? (
                <>
                  {" "}
                  -{" "}
                  <span className="line-through text-muted-foreground/50">
                    {" "}
                    ₹{Math.round(Number(price.max)).toLocaleString("en-IN")}
                  </span>
                </>
              ) : (
                ""
              )}
            </h3>
            <p className="text-main text-xs text-center tablet:text-sm"></p>
          </div>
          {product?.size_chart && <div className="mb-4">
            <SizeChart product={product}/>
          </div>}

          <div className="mb-4">
            <div className="text-sm font-medium text-muted-foreground/70 mb-5">
              {parse(product?.description || "")}
            </div>
          </div>

          <Separator className="my-5" />
          <ActionSection setVariationIndex={setVariationIndex} product={product} />
        </div>
      </div>
      <DetailsSection product={product} />
      <Separator className="mb-4 tablet-lg:mt-6" />

      <div className="container-md">
        <h3 className="text-lg font-medium mb-4">Related products</h3>

        <div className="grid grid-cols-2 mb-12 font-lora tablet-lg:grid-cols-3 laptop:grid-cols-4 gap-x-3 gap-y-6 tablet:gap-6">
          {filterd_data?.slice(0, 4).map((product: any) => (
            <ProductCardWrapper
              id={product?.id}
              key={product.id + Math.random()}
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
