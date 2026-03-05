'use client'

import { is_authenticated } from "@/lib/utils";
import { useViewCart } from "@/services/queries/cart";
import { getCookie } from "cookies-next/client";
import { Heart, House, MessageCircleMore, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import React from "react";


function BottomMenu() {
  const is_auth = is_authenticated();
  const token = getCookie("floranza-g-token");
  const { data: cart_items } = useViewCart({
    token: token,
    filter: { state: null },
  });
  const cart = cart_items?.data;
  const cartIsEmpty = !cart?.cart?.length;

  return (
    <div className="sticky bottom-0 z-20 w-full font-sans min-h-15 border-t bg-white p-3 flex tablet-lg:hidden">
      <div className="w-full flex mx-6 items-center gap-2.5 justify-between">
        {is_auth && <Link
          className="flex flex-col gap-1 text-light-gray items-center"
          href={""}
        >
          <MessageCircleMore strokeWidth={2} size={20} />
          <p className="text-xs font-semibold">Chat</p>
        </Link>}

        <Link
          className="flex flex-col gap-1 text-light-gray items-center"
         href={"/account/wishlist"}
        >
          <Heart strokeWidth={2} size={20} />
          <p className="text-xs font-semibold">Wishlist</p>
        </Link>
        <Link
          className="flex flex-col gap-1 text-light-gray items-center"
          href={"/"}
        >
          <House strokeWidth={2} size={20} />
          <p className="text-xs font-semibold">Home</p>
        </Link>
        <Link
          className="flex flex-col relative gap-1 text-light-gray items-center"
          href={"/cart"}
        >
          {!cartIsEmpty && (
            <div className="absolute -top-2 -left-1 bg-main w-4 h-4 flex items-center justify-center rounded-full ">
              <p className="text-[10px] text-white  ">
                {cart?.cart?.length > 9 ? "9+" : cart?.cart?.length}
              </p>
            </div>
          )}
          <ShoppingBag strokeWidth={2} size={20} />
          <p className="text-xs font-semibold">Cart</p>
        </Link>
        {is_auth ? <Link
          className="flex flex-col gap-1 text-light-gray items-center"
          href={"/account/dashboard"}
        >
          <User strokeWidth={2} size={22} />
          <p className="text-xs font-semibold">Account</p>
        </Link> : <Link
          className="flex flex-col gap-1 text-light-gray items-center"
          href={"/signin"}
        >
          <User strokeWidth={2} size={22} />
          <p className="text-xs font-semibold">Signin</p>
        </Link>}
      </div>
    </div>
  );
}

export default BottomMenu;
