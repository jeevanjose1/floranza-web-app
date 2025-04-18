import ProductCardOne from "@/components/common/product-card-one";
import ProductCardTwo from "@/components/common/product-card-two";
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
    id: 1,
    title: "Top and Bottom set in Cotton with Jaipur Sanganeri print – Blue",
    price: { min: 599, max: 620 },
    image: images.kurthi,
    availableSizes: [
      { size: "L", available: false },
      { size: "XL", available: true },
      { size: "XXL", available: true },
      { size: "3XL", available: true },
      { size: "4XL", available: false }
    ]
  },
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
  {
    id: 6,
    title: "Lucknowi Chikankari Work Kurta – White",
    price: { min: 749, max: 799 },
    image:  images.kurthi,
    availableSizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: true }
    ]
  },
  {
    id: 7,
    title: "Chanderi Silk Kurta with Gota Patti – Royal Blue",
    price: { min: 999, max: 1099 },
    image:  images.saree,
    availableSizes: [
      { size: "M", available: false },
      { size: "L", available: true },
      { size: "XL", available: true },
      { size: "XXL", available: true }
    ]
  },
  {
    id: 8,
    title: "Bandhani Print Cotton Kurta with Dupatta – Turquoise",
    price: { min: 649, max: 699 },
    image:  images.saree,
    availableSizes: [
      { size: "S", available: true },
      { size: "M", available: true },
      { size: "L", available: true },
      { size: "XL", available: false }
    ]
  }
];

type Props = {};

export default function FeaturedProducts({}: Props) {
  return (
    <section className="container my-16">
      <div className="mb-8">
        {/* <h2 className="text-main text-center tablet:text-lg font-medium font-grate-vibes">
          Floranza Fashion Boutique
        </h2> */}
        <h1 className="text-2xl tablet:text-3xl font-sans font-semibold text-center">
        Featured Products
        </h1>
      </div>
      <div className="grid grid-cols-2 font-poppins tablet-lg:grid-cols-3 laptop:grid-cols-4 gap-3 tablet:gap-6">
        {sampleProducts.map((product) => (
          <ProductCardTwo 
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            sizes={product.availableSizes}
          />
        ))}
      </div>
      
    </section>
  );
}