import Image, { StaticImageData } from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Heart, Search } from "lucide-react";
import Link from "next/link";
import Loader from "./loader";

interface ProductCardProps {
  title: string;
  price: {
    min: number;
    max?: number;
  };
  image: StaticImageData;
  variation: any[];
  slug: string;
  selectedOptionId?: any;
  onOptionSelect?: (option: any) => void;
  onAddToCart?: (selectedOption: string) => void;
  loading?: boolean;
}

export default function ProductCardTwo({
  title,
  price,
  image,
  variation,
  slug,
  selectedOptionId,
  onOptionSelect,
  onAddToCart,
  loading = false,
}: ProductCardProps) {
  // Since this is a server component, we need to rely on props
  // rather than internal state for managing the selected option
 
  // Function to handle option selection (passes to parent component)
  const handleOptionClick = (e: React.MouseEvent, option: any) => {
    e.preventDefault();
    e.stopPropagation();
     console.log('====================================');
     console.log('asda');
     console.log('====================================');
    if (onOptionSelect) {
      onOptionSelect(option);
    }
  };

  // Function to handle add to cart (passes to parent component)
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    if (onAddToCart) {
      onAddToCart(selectedOptionId);
    }
  };

  return (
    <div className="h-full group flex flex-col">
      {/* Image Container */}
      <Link
        href={`/product/${slug}`}
        className="w-full aspect-[3/4] relative overflow-hidden bg-gray-100"
      >
        <div className="absolute right-2 hidden tablet-lg:flex items-center flex-col justify-center top-2 bg-white group-hover:w-10 opacity-0 group-hover:opacity-100 overflow-hidden gap-5 transition-all z-10 w-0 h-22">
          <Heart strokeWidth={2} />
          <Search strokeWidth={2} />
        </div>
        <div className="absolute top-3 right-3 flex tablet-lg:hidden items-center justify-center rounded-full z-10 w-7 bg-white h-7">
          <Heart strokeWidth={1.5} size={15} />
        </div>

        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
            className={`object-cover transition-opacity duration-300`}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YxZjFmMSIvPjwvc3ZnPg=="
          />
        )}

        <div className="absolute top-3 flex items-center text-xs text-white font-semibold justify-center rounded-full left-3 bg-main/90 h-10 overflow-hidden w-10">
          -10%
        </div>
      </Link>

      <div className="mt-3 w-full flex flex-col flex-grow">
        {/* Sizes */}
        <div className="flex justify-center flex-wrap gap-1 mb-2">
          {variation?.map((sizeInfo, index) => (
            <Badge
              key={index}
              onClick={(e) => handleOptionClick(e, sizeInfo)}
              disabled={sizeInfo?.qty === 0 || !sizeInfo.attribute_option_name}
              className={`text-xs px-2 rounded-sm cursor-pointer transition-colors ${
                selectedOptionId?.id === sizeInfo.id
                  ? "bg-main text-white hover:bg-main/90"
                  : ""
              }`}
              variant={
                selectedOptionId?.id === sizeInfo.id ? "default" : "outline"
              }
            >
              {sizeInfo.attribute_option_name}
            </Badge>
          ))}
        </div>

        {/* Product Info */}
        <div className="text-center">
          <h3 className="text-xs tablet:text-sm whitespace-pre-wrap mb-2">
            {title}
          </h3>
          <p className="text-main text-xs text-center tablet:text-sm">
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
          </p>
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow min-h-2"></div>

        {/* Button Container always at bottom */}
        <div className="mt-2 w-full flex items-center justify-center">
          <Button
            onClick={handleAddToCart}
            variant={"primary"}
            size={"sm"}
            className="text-xs rounded-full px-4"
          >
            {loading ? (
              <Loader className="text-white" />
            ) : !variation?.length || selectedOptionId ? (
              "ADD TO CART"
            ) : (
              "SELECT OPTION"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
