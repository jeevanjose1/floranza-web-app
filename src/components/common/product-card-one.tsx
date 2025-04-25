import Image, { StaticImageData } from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Heart, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  price: {
    min: number;
    max?: number;
  };
  image: StaticImageData;
  variation: any[];
  slug: string;
}

export default function ProductCardOne({
  title,
  price,
  image,
  variation,
  slug,
}: ProductCardProps) {
  return (
    <div className="h-full group">
      <Link href={`/product/${slug}`}>
        <div className="w-full aspect-[3/4] relative overflow-hidden bg-gray-100">
          <div className="absolute right-2 hidden tablet-lg:flex items-center flex-col justify-center top-2 bg-white group-hover:w-10 opacity-0 group-hover:opacity-100 overflow-hidden gap-5 transition-all z-10 w-0 h-22">
            <Heart strokeWidth={2} />
            <Search strokeWidth={2} />
          </div>
          <div className="absolute top-3 right-3 flex tablet-lg:hidden items-center justify-center rounded-full z-10 w-7 bg-white h-7">
            <Heart strokeWidth={1.5} size={15} />
          </div>

          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
            className={`object-cover transition-opacity duration-300 `}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YxZjFmMSIvPjwvc3ZnPg=="
          />

          <div
onClick={(e) => {
  e.stopPropagation();
  e.preventDefault(); // prevent the Link from triggering
  // Do your logic here (e.g., open modal, add to cart, etc.)
}}            className="absolute bottom-0 hidden tablet-lg:flex items-center justify-center opacity-0 group-hover:opacity-100 left-0 bg-main/90 h-0 group-hover:h-10 overflow-hidden transition-all z-10 w-full"
          >
            <Button
              variant={"transparant"}
              className="text-white tablet:text-sm text-xs w-full rounded-none cursor-pointer"
            >
              Select Option
            </Button>
          </div>
          <div onClick={(e) => {
    e.stopPropagation();
    e.preventDefault(); // prevent the Link from triggering
    // Do your logic here (e.g., open modal, add to cart, etc.)
  }} className="absolute bottom-0 flex tablet-lg:hidden items-center justify-center left-0 bg-main/90 h-9 overflow-hidden z-10 w-10">
            <Button
              variant={"transparant"}
              className="text-white tablet:text-sm text-xs w-full rounded-none cursor-pointer [&_svg:not([class*='size-'])]:size-5"
            >
              <ShoppingCart strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </Link>

      <div className="mt-3 w-full flex flex-col items-center">
        <div className="flex gap-1 mb-2">
          {variation?.map((sizeInfo, index) => (
            <Badge
              key={index}
              disabled={!sizeInfo.attribute_option_name}
              className="text-xs px-2 rounded-sm"
              variant={"outline"}
            >
              {sizeInfo.attribute_option_name}
            </Badge>
          ))}
        </div>
        <div>
          <h3 className="text-xs tablet:text-sm text-center whitespace-pre-wrap mb-2">
            {title}
          </h3>
          <p className="text-main text-xs text-center tablet:text-sm">
            ₹{price.min.toLocaleString("en-IN")}
            {price.max ? ` – ₹${price.max.toLocaleString("en-IN")}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
