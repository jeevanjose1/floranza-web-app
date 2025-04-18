import { images } from "@/shared/images/images";
import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {};
type CardProps = {
  title: string;
  image: StaticImageData;
};

const CategoryCard = ({ image, title }: CardProps) => {
    return (
      <div className="group overflow-hidden">
        <div className="w-full aspect-[7/14] mobile-lg:aspect-[7/12] relative overflow-hidden">
          <Image
            src={image}
            fill
            alt={title}
            className="object-cover group-hover:scale-110 transition-all duration-500"
          />
        </div>
        <p className="font-medium tablet:text-base text-sm mt-2 text-center">{title}</p>
      </div>
    );
  };

const data = [
  {
    title: "KURTI",
    image: images.kurthi,
  },
  {
    title: "OFFER ZONE",
    image: images.offer,
  },
  {
    title: "HOME WARE",
    image: images.home,
  },
  {
    title: "CHURIDAR METERIAL",
    image: images.churdar,
  },
  {
    title: "BOTTOM",
    image: images.bottom,
  },
  {
    title: "SAREE",
    image: images.saree,
  },
  {
    title: "PREE BOOK",
    image: images.pre,
  },
  {
    title: "FEEDING KURTIS",
    image: images.feeding,
  },
];

export default function ShopByCatogery({}: Props) {
  return (
    <section className="container my-16">
      <h1 className=" text-2xl mb-8 tablet:text-3xl font-sans font-semibold text-center ">
        Shop By Category
      </h1>

      <div className="grid grid-cols-2 tablet-lg:grid-cols-3  font-poppins laptop:grid-cols-4 gap-3 tablet:gap-6">
        {data?.map((item) => {
          return (
            <CategoryCard
              key={item?.title}
              title={item?.title}
              image={item.image}
            />
          );
        })}
      </div>
    </section>
  );
}
