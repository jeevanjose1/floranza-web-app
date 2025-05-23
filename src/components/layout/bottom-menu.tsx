'use client'

import { is_authenticated } from "@/lib/utils";
import { Heart, House, MessageCircleMore, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import React from "react";


function BottomMenu() {
    const is_auth = is_authenticated();
  
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
          href={""}
        >
          <Heart strokeWidth={2} size={20} />
          <p className="text-xs font-semibold">Whshlist</p>
        </Link>
        <Link
          className="flex flex-col gap-1 text-light-gray items-center"
          href={"/"}
        >
          <House strokeWidth={2} size={20} />
          <p className="text-xs font-semibold">Home</p>
        </Link>
        <Link
          className="flex flex-col gap-1 text-light-gray items-center"
          href={"/cart"}
        >
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
