"use client";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Heart, Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useAddToCart, useOutOfStock } from "@/services/queries/cart";
import { getCookie } from "cookies-next/client";
import Loader from "./loader";
import { calculate_discount, is_authenticated } from "@/lib/utils";
import { useAddWishlist, useDeleteWishlist } from "@/services/queries/product";
import { usePathname, useRouter } from "next/navigation";
import { images } from "@/shared/images/images";

interface ProductCardProps {
  title: string;
  price: {
    min: number;
    max?: number;
  };
  image: StaticImageData;
  variation: any[];
  slug: string;
  id: string;
  wishlist_id?: string
  is_prebook: boolean;
  is_new: boolean;
  is_wishlist?: boolean
}

export default function ProductCardOne({
  title,
  price,
  image,
  variation,
  slug,
  id,
  wishlist_id,
  is_prebook,
  is_new,
  is_wishlist = false
}: ProductCardProps) {
  const [option, setOption] = useState<any>(null);
  const { mutateAsync: add, isPending } = useAddToCart();
  const { mutateAsync: add_wishlist, isPending: wishlistPending } = useAddWishlist()
  const { mutateAsync: remove_wishlist, isPending: deleteWishlistPending } = useDeleteWishlist()

  const { mutateAsync: check } = useOutOfStock();
  const is_auth = is_authenticated()
  const router = useRouter()

  const discount =
    price?.max !== 0
      ? calculate_discount(Number(price.max), Number(price?.min) as number)
      : null;

  useEffect(() => {
    if (option) {
      const form_data = new FormData();

      form_data.append("product_id", id);
      form_data.append("prd_var_value_id", option?.id);
      check(form_data, {
        onSuccess: (response) => {
          if (response?.data?.qty === 0) {
            toast.error("Out of stock");
            setOption(null);
          }
        },
      });
    }
  }, [option]);

  const handleSetOption = (id: any) => {
    if (option?.id === id) {
      setOption(null);
      return;
    } else {
      setOption(id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!option && variation?.length > 0) {
      toast.warning("Please select option first");
      return;
    } else {
      const form_data = new FormData();
      form_data.append("guest_token", getCookie("floranza-g-token") as string);
      form_data.append("product_id", id);
      if (variation?.length) {
        form_data.append("prd_var_value_id", option?.id);
      }
      form_data.append("qty", "1");
      add(form_data, {
        onSuccess: () => {
          toast.success("Product added to cart");
        },
        onError: (error: any) => {
          toast.error(error?.data?.message);
        },
      });
    }
  };
  const getPrimaryBadge = () => {
    const badge = [
      {
        enabled: discount,
        text: discount && `-${discount.toFixed()}%`,
        className: "bg-main  text-white"
      },
      {
        enabled: is_new,
        text: "New",
        className: "bg-green-500/90 text-white"
      },
      {
        enabled: is_prebook,
        text: "Pre-Order",
        className: "bg-blue-500/90 text-white"
      }
    ]
    return badge.filter((item: any) => item.enabled)
  };

  const primaryBadge = getPrimaryBadge();

  const handleStopEvent = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const handleWishList = () => {
    if (is_auth) {
      add_wishlist({
        product_id: id
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

  const handleDelete = () => {
    remove_wishlist(wishlist_id, {
      onSuccess: (response) => {
        toast.success(response?.message)
      }, onError: (error) => {
        toast.error(error.message)
      }
    })
  }

  return (
    <div className="h-full group">
      <Link href={`/product/${slug}`}>
        <div className="w-full aspect-[3/4] relative overflow-hidden bg-gray-100">
          <div onClick={handleStopEvent as any} className="absolute rounded-sm  right-2 hidden tablet-lg:flex items-center flex-col justify-center top-2 bg-white group-hover:w-10 opacity-0 group-hover:opacity-100 overflow-hidden gap-5 transition-all z-10 w-0 h-10">
            {
              wishlistPending || deleteWishlistPending ? <Loader /> :
                is_wishlist ? <X onClick={handleDelete} /> : <Heart onClick={handleWishList} strokeWidth={2} />
            }
          </div>
          <div onClick={handleStopEvent as any} className="absolute  top-3 right-3 flex tablet-lg:hidden items-center justify-center rounded-full z-10 w-7 bg-white h-7">
            {wishlistPending || deleteWishlistPending ? <Loader /> : is_wishlist ? <X onClick={handleDelete} /> : <Heart onClick={handleWishList} strokeWidth={1.5} size={15} />}
          </div>

          {image && (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              loading="lazy"
              className="object-cover transition-opacity duration-300"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB..."
            />
          )}
          <div className="absolute top-3 left-3 flex items-start flex-col gap-2">


            {primaryBadge?.map((item: any) => {
              return (
                <div key={item?.text} className={`flex  items-center text-[10px] font-semibold justify-center rounded-sm h-6 px-2 z-10 ${item.className}`}>
                  {item.text}
                </div>
              )
            })}
          </div>
          <div
            onClick={handleAddToCart}
            className="absolute bottom-0 hidden tablet-lg:flex items-center justify-center opacity-0 group-hover:opacity-100 left-0 bg-main/90 h-0 group-hover:h-10 overflow-hidden transition-all z-10 w-full"
          >
            <Button
              variant={"transparant"}
              className="text-white tablet:text-sm text-xs w-full rounded-none cursor-pointer"
            >
              {isPending ? (
                <Loader className="text-white" />
              ) : !variation?.length || option ? (
                "Add to Cart"
              ) : (
                "Select Option"
              )}
            </Button>
          </div>
          <div
            onClick={handleAddToCart}
            className="absolute bottom-0 flex tablet-lg:hidden items-center justify-center left-0 bg-main/90 h-9 overflow-hidden z-10 w-10"
          >
            <Button
              variant={"transparant"}
              className="text-white tablet:text-sm text-xs w-full rounded-none cursor-pointer [&_svg:not([class*='size-'])]:size-5"
            >
              {isPending ? (
                <Loader className="text-white" />
              ) : (
                <ShoppingCart strokeWidth={1.5} />
              )}
            </Button>
          </div>
        </div>
      </Link>

      <div className="mt-3 w-full flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-1 mb-2">
          {variation?.map((sizeInfo, index) => (
            <Badge
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSetOption(sizeInfo);
              }}
              disabled={sizeInfo?.qty === 0 || !sizeInfo.attribute_option_name}
              className={`text-xs relative px-2 rounded-sm cursor-pointer transition-colors ${option?.id === sizeInfo.id
                ? "bg-main text-white hover:bg-main/90"
                : ""
                }`}
              variant={option?.id === sizeInfo.id ? "default" : "outline"}
            >
              {(sizeInfo?.qty === 0 || !sizeInfo.attribute_option_name) &&
                <Image src={images.cross} width={18} height={18} alt="cross" className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10" />
              }
              {sizeInfo.attribute_option_name}
            </Badge>
          ))}
        </div>
        <div>
          <h3 className="text-xs tablet:text-sm text-center whitespace-pre-wrap mb-2">
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
      </div>
    </div>
  );
}
