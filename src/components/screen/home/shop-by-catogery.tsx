"use client";
import { useGetCatogeries } from "@/services/queries/home";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

type CardProps = {
  title: string;
  image: StaticImageData;
  slug: string;
};

const CategoryCard = ({ image, title, slug }: CardProps) => {
  return (
    <Link href={`/product-catogery/${slug}`} className="group overflow-hidden">
      <div className="w-full aspect-[7/14] mobile-lg:aspect-[7/12] relative overflow-hidden">
        <Image
          src={image}
          fill
          alt={title}
          className="object-cover group-hover:scale-110 transition-all duration-500"
        />
      </div>
      <p className="font-medium tablet:text-base text-sm mt-2 text-center">
        {title}
      </p>
    </Link>
  );
};

export default function ShopByCatogery() {
  const { data: catogeries, isLoading } = useGetCatogeries();

  return (
    <section className="container my-16">
      <h1 className=" text-2xl mb-8 tablet:text-3xl font-lora font-semibold text-center ">
        Shop By Category
      </h1>

      <div className="grid grid-cols-2 tablet-lg:grid-cols-3  font-poppins laptop:grid-cols-4 gap-3 tablet:gap-6">
        {catogeries?.data?.map((item: any) => {
          return (
            <CategoryCard
              key={item?.id}
              title={item?.name}
              image={item.images?.large}
              slug={item?.slug}
            />
          );
        })}
      </div>
    </section>
  );
}
