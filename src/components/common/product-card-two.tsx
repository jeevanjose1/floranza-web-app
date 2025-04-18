import Image, { StaticImageData } from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Heart, Search, ShoppingCart, View } from "lucide-react";

interface SizeInfo {
  size: string;
  available: boolean;
}

interface ProductCardProps {
  title: string;
  price: {
    min: number;
    max?: number;
  };
  image: StaticImageData;
  sizes: SizeInfo[];
}

export default function ProductCardTwo({
  title,
  price,
  image,
  sizes,
}: ProductCardProps) {
  return (
    <div className="h-full group flex flex-col">
      {/* Image Container */}
      <div className="w-full aspect-[3/4] relative overflow-hidden">
        <div className="absolute right-2 hidden tablet-lg:flex items-center flex-col justify-center top-2 bg-white group-hover:w-10 opacity-0 group-hover:opacity-100 overflow-hidden gap-5 transition-all z-10 w-0 h-22">
          <Heart strokeWidth={2} />
          <Search strokeWidth={2} />
        </div>
        <div className="absolute top-3 right-3 flex tablet-lg:hidden items-center justify-center rounded-full z-10 w-7 bg-white h-7">
          <Heart strokeWidth={1.5} size={15} />
        </div>
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute top-3 flex items-center text-xs text-white font-semibold justify-center rounded-full left-3 bg-main/90 h-10 overflow-hidden z-10 w-10">
          -10%
        </div>
      </div>
      
      {/* Content Container with flex-grow to push button to bottom */}
      <div className="mt-3 w-full flex flex-col flex-grow">
        {/* Sizes */}
        <div className="flex justify-center gap-1 mb-2">
          {sizes.map((sizeInfo, index) => (
            <Badge
              key={index}
              disabled={!sizeInfo.available}
              className="text-xs px-2 rounded-sm"
              variant={"outline"}
            >
              {sizeInfo.size}
            </Badge>
          ))}
        </div>
        
        {/* Product Info */}
        <div className="text-center">
          <h3 className="text-xs tablet:text-sm whitespace-pre-wrap mb-2">
            {title}
          </h3>
          <p className="text-main text-xs tablet:text-sm">
            ₹{price.min.toLocaleString("en-IN")}
            {price.max ? ` – ₹${price.max.toLocaleString("en-IN")}` : ""}
          </p>
        </div>
        
        {/* Spacer to push button to bottom */}
        <div className="flex-grow min-h-2"></div>
        
        {/* Button Container always at bottom */}
        <div className="mt-2 w-full flex items-center justify-center">
          <Button variant={'primary'} size={'sm'} className="text-xs rounded-full px-4">SELECT OPTION</Button>
        </div>
      </div>
    </div>
  );
}