'use client'
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Counter from "../product-details/counter";
import { Button } from "@/components/ui/button";
import Loader from "@/components/common/loader";
import { X } from "lucide-react";
import { getCookie } from "cookies-next/client";
import { useAddToCart, useDeleteCart } from "@/services/queries/cart";
import { useRouter } from "next/navigation";

type Props = { cart: any };

const CartItem = ({ data }: { data: any }) => {
  const token = getCookie("floranza-g-token");
  const { mutateAsync: remove, isPending } = useDeleteCart();
  const { mutateAsync: add, error } = useAddToCart();
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/product/${data?.slug}`);
  };

  useEffect(() => {
    setCount(data?.cart_qty);
    prevCountRef.current = data?.cart_qty;
  }, [data?.cart_qty]);

  const handleChangeCount = (newCount: number) => {
    const qtyChange = newCount > prevCountRef.current ? 1 : -1;

    const form_data = new FormData();
    form_data.append("guest_token", token as string);
    form_data.append("prd_var_value_id", data?.prd_var_value_id);
    form_data.append("product_id", data?.product_id);
    form_data.append("qty", qtyChange.toString());

    prevCountRef.current = newCount;
    add(form_data);
  };

  const handleCounterChange = (newCount: number) => {
    if (newCount !== count && newCount >= 0) {
      if (newCount === 0) {
        handleRemove();
      } else {
        handleChangeCount(newCount);
      }
    }
  };

  const handleRemove = () => {
    remove({
      cart_id: data?.cart_id,
      token: token,
    });
  };

  return (
    <div className="flex flex-col md:flex-row relative items-start gap-4 p-4 border rounded-lg mb-3">
      <div onClick={handleNavigate} className="flex-shrink-0 cursor-pointer">
        <Image
          src={data?.image?.large}
          width={70}
          height={70}
          alt="Product thumbnail"
          className="rounded-md h-full w-full object-cover"
        />
      </div>

      <div className="flex-grow flex flex-col md:flex-row justify-between w-full">
        <div className="space-y-2">
          <h3
            onClick={handleNavigate}
            className="font-medium text-base mb-1  cursor-pointer max-w-120"
          >
            {data?.name}
          </h3>

          {data?.attributeOption && (
            <div className="text-sm text-gray-500 space-y-1">
              <div>
                <Badge
                  variant={"secondary"}
                  className="font-medium rounded-md "
                >
                  {data.attributeOption}{" "}
                </Badge>
              </div>
            </div>
          )}

          <div className="flex items-center gap-1 text-gray-700 mt-2">
            <span className="text-sm">₹</span>
            <span className="font-semibold text-lg">{data?.price}</span>
          </div>
          <div className="w-32">
            <Counter
              disabled={data?.is_out_of_stock}
              disableAdd={
                error?.data?.message == "the product is currently out of stock."
              }
              max={data?.mainQty}
              count={count}
              setCount={handleCounterChange}
            />
            {(data?.is_out_of_stock ||
              error?.data?.message ===
                "the product is currently out of stock.") && (
              <p className="mt-1 text-xs text-main italic">Out of stock</p>
            )}
          </div>
          <div className="">
            <div className="text-base whitespace-nowrap mt-6 text-gray-700 font-medium ">
              Item Total:{" "}
              <span className="text-main">₹{data?.total_sale_value}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center absolute top-2  right-2 gap-6">
        <Button
          onClick={handleRemove}
          variant="ghost"
          className="text-main h-8 w-8 p-0"
          size="icon"
        >
          {isPending ? <Loader /> : <X size={18} />}
        </Button>
      </div>
    </div>
  );
};

export default function ItemList({ cart }: Props) {
  return (
    <div className="space-y-4">
      {cart?.cart?.map((item: any) => (
        <CartItem key={item?.id} data={item} />
      ))}
    </div>
  );
}
