import ProductCardOne from "@/components/common/product-card-one";
import { Button } from "@/components/ui/button";
import { images } from "@/shared/images/images";
import { StaticImageData } from "next/image";
import React from "react";

// Define product data type
export interface ProductData {
  id: number;
  title: string;
  price: {
    min: number;
    max?: number;
  };
  image: StaticImageData;
  availableSizes: {
    size: string;
    available: boolean;
  }[];
}

// Sample product data
const sampleProducts: ProductData[] = [
  
  {
    id: 2,
    title: "Ethnic Anarkali Kurta with Floral Embroidery – Maroon",
    price: { min: 799, max: 850 },
    image:  images.saree,
    availableSizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: false },
      { size: "XXL", available: false }
    ]
  },
  {
    id: 3,
    title: "Printed A-Line Kurta with Palazzo Set – Mustard Yellow",
    price: { min: 699 },
    image:  images.bottom,
    availableSizes: [
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: false }
    ]
  },
  {
    id: 4,
    title: "Cotton Blend Straight Kurta with Block Print – Green",
    price: { min: 549, max: 599 },
    image:  images.pre,
    availableSizes: [
      { size: "S", available: false },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true }
    ]
  },
  {
    id: 5,
    title: "Designer Angrakha Style Kurta – Pink Gold",
    price: { min: 899, max: 950 },
    image:  images.home,
    availableSizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: false },
      { size: "XL", available: true }
    ]
  },
 
];

type Props = {};

export default function MostSellingProducts({}: Props) {
  return (
    <section className="container my-16">
      <div className="mb-8">
        <h2 className="text-main text-center tablet:text-lg font-medium font-grate-vibes">
          Floranza Fashion Boutique
        </h2>
        <h1 className="text-2xl tablet:text-3xl font-sans font-semibold text-center">
        Most Selling Products
        </h1>
      </div>
      <div className="grid grid-cols-2 font-poppins tablet-lg:grid-cols-3 laptop:grid-cols-4 gap-3 tablet:gap-6">
        {sampleProducts.map((product) => (
          <ProductCardOne 
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            sizes={product.availableSizes}
          />
        ))}
      </div>
      <div className="w-full flex justify-center-safe mt-6">
        <Button variant={'outline'} className="rounded-sm hover:bg-main hover:text-white cursor-pointer">Load More</Button>
      </div>
    </section>
  );
}