"use client";
import { Badge } from "@/components/ui/badge";
import { Check, Facebook, Heart, Twitter } from "lucide-react";
import React from "react";
import Counter from "./counter";
import { Button } from "@/components/ui/button";

type Props = {product:any};

export default function ActionSection({product}: Props) {

  return (
    <div>
      <div className="flex items-start gap-3 mb-4">
        <p className="font-medium">Size:</p>

        <div className="flex flex-wrap gap-1 ">
          {product?.variations?.map((variation:any, index:any) => (
            <Badge
              key={index}
              
              disabled={!variation.qty}
              className="text-xs px-2 rounded-sm"
              variant={"outline"}
              
            >
              {variation.attribute_option_name}{variation?.option_title&& <span> - {variation?.option_title}</span>}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Check className="text-main" size={18} />
        <p className="text-sm font-semibold">In Stock</p>
      </div>

      <div className="flex items-center gap-2 flex-wrap tablet:max-w-100 mb-4">
        <Counter />
        <Button variant={"primary"} className="rounded-full flex-grow">
          ADD TO CART
        </Button>
        <Button variant={"primary"} className="rounded-full flex-grow">
          BUY NOW
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Heart size={16} />
        <p className="text-sm font-semibold">Add to wishlist</p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <p className="text-sm font-semibold text-muted-foreground/70">Share :</p>
        <div className="flex items-center gap-2">
        <Facebook size={16}/>
        <Twitter size={16}/>
        </div>
      </div>
    </div>
  );
}
