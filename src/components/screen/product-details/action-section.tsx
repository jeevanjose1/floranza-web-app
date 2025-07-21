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
import { useAddWishlist } from "@/services/queries/product";
import { is_authenticated } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { images } from "@/shared/images/images";

type Props = {
  product: any;
  setVariationIndex: any;
};

export default function ActionSection({ product, setVariationIndex }: Props) {
  const [count, setCount] = useState<number>(1);
  const [selectedVariation, setSelectedVariation] = useState<any>(null);
  const { mutateAsync: add, isPending } = useAddToCart();
  const { mutateAsync: check, data } = useOutOfStock();
  const { mutateAsync: add_wishlist, isPending: wishlistPending } = useAddWishlist()
  const is_auth = is_authenticated()
  const router = useRouter()

  const stocks = Boolean(product?.qty) ? product?.qty : data?.data?.qty
  useEffect(() => {
    if (selectedVariation) {
      const form_data = new FormData();

      form_data.append("product_id", product?.id);
      form_data.append("prd_var_value_id", selectedVariation?.id);
      check(form_data, {
        onSuccess: (response) => {
          if (!response?.data?.is_unlimited_qty && response?.data?.qty === 0) {
            toast.error("Out of stock");
            setSelectedVariation(null);
          }
        },
      });
    }
  }, [selectedVariation]);

  const handleSelectVariation = (variation: any, index: number) => {
    if (selectedVariation?.id === variation.id) {
      setSelectedVariation(null);
      return;
    }
    setCount(1)
    setVariationIndex(index);
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
      onSuccess: () => {
        toast.success("Product added to cart");
      },
      onError:(error:any)=>{
        
                toast.error(error.data.message);

      }
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
  const handleWishList = () => {
    if (is_auth) {
      add_wishlist({
        product_id: product.id
      }, {
        onSuccess: (response) => {
          toast.success(response?.message)
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
    } else {
      router.push('/signin')
    }

  }
  const is_unlimited_qty = data?.data?.is_unlimited_qty

  return (
    <div>
      {product?.is_variation && <div className="flex items-start gap-3 mb-4">
        <p className="font-medium">Size:</p>

        <div className="flex flex-wrap gap-1 ">
          {product?.variations?.map((variation: any, index: any) => (
            <Badge
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSelectVariation(variation, index);
              }}
              disabled={!variation.qty && Boolean(!variation?.is_unlimited_qty)}
              className={`text-xs px-2 relative rounded-sm cursor-pointer transition-colors ${selectedVariation?.id === variation.id
                ? "bg-main text-white hover:bg-main/90"
                : ""
                }`}
              variant={
                selectedVariation?.id === variation.id ? "default" : "outline"
              }
            >
              {!variation.qty && Boolean(!variation?.is_unlimited_qty) &&
                <Image src={images.cross} width={18} height={18} alt="cross" className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10" />
              }
              {variation.attribute_option_name}
              {variation?.option_title && (
                <span> - {variation?.option_title}</span>
              )}
            </Badge>
          ))}
        </div>
      </div>}

      {selectedVariation && !data?.data?.is_unlimited_qty &&
        data &&
        ((data?.data?.qty > 4) ? (
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
          disabled={ !is_unlimited_qty&&(product?.is_variation && !selectedVariation) }
          max={is_unlimited_qty ? 10000:stocks}
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

      <div onClick={handleWishList} className="flex items-center gap-2 mb-4 cursor-pointer">
        {wishlistPending ? <Loader className="w-4 h-4" /> : <Heart size={16} />}
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
