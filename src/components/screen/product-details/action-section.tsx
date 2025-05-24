"use client";

import { Badge } from "@/components/ui/badge";
import { Check, CircleAlert, Facebook, Heart, Twitter } from "lucide-react";
import React, { useEffect, useState } from "react";
import Counter from "./counter";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAddToCart, useOutOfStock } from "@/services/queries/cart";
import { getCookie } from "cookies-next/client";
import Loader from "@/components/common/loader";

type Props = {
  product: any;
  setVariation: any;
};

export default function ActionSection({ product, setVariation }: Props) {
  const [count, setCount] = useState<number>(1);
  const [selectedVariation, setSelectedVariation] = useState<any>(null);
  const { mutateAsync: add, isPending } = useAddToCart();
  const { mutateAsync: check, data } = useOutOfStock();

  const stocks = data?.data?.qty || 4;
  useEffect(() => {
    if (selectedVariation) {
      const form_data = new FormData();

      form_data.append("product_id", product?.id);
      form_data.append("prd_var_value_id", selectedVariation?.id);
      check(form_data, {
        onSuccess: (response) => {
          if (response?.data?.qty === 0) {
            toast.error("Out of stock");
            setSelectedVariation(null);
          }
        },
      });
    }
  }, [selectedVariation]);

  const handleSelectVariation = (variation: any) => {
    if (selectedVariation?.id === variation.id) {
      setSelectedVariation(null);
      return;
    }
    setCount(0)
    setVariation(variation);
    setSelectedVariation(variation);
  };

  const handleAddToCart = () => {
    if (!selectedVariation && product?.variations?.length > 0) {
      toast.warning("Please select a size first");
      return;
    }

    if (count < 1) {
      toast.warning("Please select quantity");
      return;
    }

    const form_data = new FormData();
    form_data.append("guest_token", getCookie("floranza-g-token") as string);
    form_data.append("product_id", product.id);
    if (product?.variations?.length) {
      form_data.append("prd_var_value_id", selectedVariation?.id);
    }
    form_data.append("qty", count.toString());

    add(form_data, {
      onSuccess: (response) => {
        toast.success("Product added to cart");
      },
    });
  };

  const handleBuyNow = () => {
    // First add to cart then redirect
    if (!selectedVariation && product?.variations?.length > 0) {
      toast.warning("Please select a size first");
      return;
    }

    if (count < 1) {
      toast.warning("Please select quantity");
      return;
    }

    // Add to cart then redirect to checkout
    const form_data = new FormData();
    form_data.append("guest_token", getCookie("floranza-g-token") as string);
    form_data.append("product_id", product.id);
    if (product?.variations?.length) {
      form_data.append("prd_var_value_id", selectedVariation?.id);
    }
    form_data.append("qty", count.toString());

    add(form_data, {
      onSuccess: (response) => {
        // Redirect to checkout
        window.location.href = "/checkout";
      },
    });
  };

  return (
    <div>
      <div className="flex items-start gap-3 mb-4">
        <p className="font-medium">Size:</p>

        <div className="flex flex-wrap gap-1 ">
          {product?.variations?.map((variation: any, index: any) => (
            <Badge
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSelectVariation(variation);
              }}
              disabled={!variation.qty}
              className={`text-xs px-2 rounded-sm cursor-pointer transition-colors ${
                selectedVariation?.id === variation.id
                  ? "bg-main text-white hover:bg-main/90"
                  : ""
              }`}
              variant={
                selectedVariation?.id === variation.id ? "default" : "outline"
              }
            >
              {variation.attribute_option_name}
              {variation?.option_title && (
                <span> - {variation?.option_title}</span>
              )}
            </Badge>
          ))}
        </div>
      </div>

      {selectedVariation &&
        data &&
        (data?.data?.qty > 4 ? (
          <div className="flex items-center gap-2 mb-4">
            <Check className="text-main" size={18} />
            <p className="text-sm font-semibold">In Stock</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-4">
            <CircleAlert className="text-main" size={18} />
            <p className="text-sm font-semibold text-red-500">
              Only {data?.data?.qty} stocks left!
            </p>
          </div>
        ))}

      <div className="flex items-center gap-2 flex-wrap tablet:max-w-100 mb-4">
        <Counter
          disabled={!selectedVariation}
          max={stocks}
          setCount={setCount}
          count={count}
        />
        <Button
          onClick={handleAddToCart}
          variant={"primary"}
          className="rounded-full flex-grow"
          disabled={isPending}
        >
          {isPending ? <Loader className="text-white" /> : "ADD TO CART"}
        </Button>
        <Button
          onClick={handleBuyNow}
          variant={"primary"}
          className="rounded-full flex-grow"
          disabled={isPending}
        >
          {"BUY NOW"}
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-4 cursor-pointer">
        <Heart size={16} />
        <p className="text-sm font-semibold">Add to wishlist</p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <p className="text-sm font-semibold text-muted-foreground/70">
          Share :
        </p>
        <div className="flex items-center gap-2">
          <Facebook size={16} className="cursor-pointer" />
          <Twitter size={16} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
