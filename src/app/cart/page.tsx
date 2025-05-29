"use client";

import React, { useState } from "react";
import { useViewCart } from "@/services/queries/cart";
import { getCookie } from "cookies-next/client";

import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Loader from "@/components/common/loader";

import ItemList from "@/components/screen/cart/item-list";
import { OrderSummary } from "@/components/screen/cart/summary";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
      <h2 className="text-2xl font-medium mb-3">Your cart is empty</h2>
      <p className="text-gray-500 max-w-md mb-8">
        Looks like you haven&apos;t added anything to your cart yet. Browse our
        products and discover something you&apos;ll love!
      </p>
      <Link href="/">
        <Button variant="primary" className="px-8">
          Start Shopping
        </Button>
      </Link>
    </div>
  );
};

export default function CartPage({}) {
  const [state, setState] = useState(null);
  const token = getCookie("floranza-g-token");

  const { data: cart_items, isLoading } = useViewCart({
    token: token,
    filter: {
      state: state ? state : null,
    },
  });

  const cart = cart_items?.data;
  const cartIsEmpty = !cart?.cart?.length;

  return (
    <main className="container-md py-8 font-lora">
      <div className="flex w-full items-center justify-between mb-6">
       { !cartIsEmpty &&<div className="bg-white w-full rounded-lg border-gray-200">
              <div className="flex items-center justify-between text-xs mobile-lg:text-sm ">
                <div className="flex tablet:flex-row flex-col items-center gap-2">
                  <div className="w-6 h-6 bg-main rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <span className="font-semibold text-main">Cart</span>
                </div>
                <div className="flex-1 h-1 bg-gray-200 mx-4 rounded-full">
                  <div className="h-full bg-main rounded-full w-0"></div>
                </div>
                <div className="flex tablet:flex-row flex-col  items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-xs font-bold">2</span>
                  </div>
                  <span className="text-gray-500">Checkout</span>
                </div>
                <div className="flex-1 h-1 bg-gray-200 mx-4 rounded-full"></div>
                <div className="flex tablet:flex-row flex-col  items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-xs font-bold">3</span>
                  </div>
                  <span className="text-gray-500">Complete</span>
                </div>
              </div>
            </div>}
       
      </div>
          
            
            {!cartIsEmpty && (
              <p className="text-gray-600 my-3">
                {cart?.cart?.length}{" "}
                {cart?.cart?.length === 1 ? "item" : "items"} in your cart
              </p>
            )}
         
      
      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <Loader />
        </div>
      ) : cartIsEmpty ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Product list */}
            <ItemList cart={cart} />
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <OrderSummary setState={setState} cart={cart} />
          </div>
        </div>
      )}
    </main>
  );
}
