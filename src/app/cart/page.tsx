'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useAddToCart, useDeleteCart, useViewCart } from "@/services/queries/cart";
import { getCookie } from "cookies-next/client";
import Image from "next/image";
import Counter from "@/components/screen/product-details/counter";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X, ArrowLeft, Truck, CreditCard, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import Loader from '@/components/common/loader';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

// Cart item component with the same functionality as in the drawer
const CartItem = ({ data }: { data: any }) => {
  const token = getCookie("floranza-g-token");
  const { mutateAsync: remove, isPending } = useDeleteCart();
  const { mutateAsync: add,error } = useAddToCart();
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);
 const router = useRouter()

  const handleNavigate = ()=>{
    router.push(`/product/${data?.slug}`)
  }

  // Initialize count from cart data
  useEffect(() => {
    setCount(data?.cart_qty);
    prevCountRef.current = data?.cart_qty;
  }, [data?.cart_qty]);

  // Handle quantity changes with +1/-1 values
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

  // Custom counter handler
  const handleCounterChange = (newCount: number) => {
    if (newCount !== count && newCount >= 0) {
      if (newCount === 0) {
        handleRemove();
      } else {
        handleChangeCount(newCount);
      }
    }
  };

  // Remove item from cart
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
          <h3 onClick={handleNavigate} className="font-medium text-base mb-1  cursor-pointer max-w-120">{data?.name}</h3>
          
          {data?.attributeOption && (
            <div className="text-sm text-gray-500 space-y-1">
                <div>
                  <Badge variant={'secondary'} className="font-medium rounded-md ">{data.attributeOption} </Badge>
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
                              disableAdd={error?.data?.message=='the product is currently out of stock.'}

                count={count}
                setCount={handleCounterChange}
              />
              {(data?.is_out_of_stock || error?.data?.message==='the product is currently out of stock.')&& (
                <p className="mt-1 text-xs text-main italic">Out of stock</p>
              )}
            </div>
             <div className="">
         
          
          <div className="text-base whitespace-nowrap mt-6 text-gray-700 font-medium ">
            Item Total: <span className="text-main">₹{data?.total_sale_value}</span>
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

// Order summary component
const OrderSummary = ({ cart }: { cart: any }) => {
  const subtotal = cart?.total || 0;
  const shipping = 0; // Free shipping
  const tax = Math.round(subtotal * 0.18); // Example: 18% tax
  const total =  subtotal + shipping + tax;
 
  return (
    <div className="bg-gray-50 rounded-lg p-5">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (18% GST)</span>
          <span>₹{tax}</span>
        </div>
        
        <Separator className="my-3" />
        
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-main">₹{Number(total).toFixed(2)}</span>
        </div>
      </div>
      
      <Button variant="primary" className="w-full mt-6 py-6">
        Proceed to Checkout
      </Button>
      
      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Truck size={16} />
          <span>Free shipping </span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CreditCard size={16} />
          <span>Secure payment</span>
        </div>
      </div>
    </div>
  );
};

// Empty cart component
const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
      <h2 className="text-2xl font-medium mb-3">Your cart is empty</h2>
      <p className="text-gray-500 max-w-md mb-8">
        Looks like you haven&apos;t added anything to your cart yet.
        Browse our products and discover something you&apos;ll love!
      </p>
      <Link href="/">
        <Button variant="primary" className="px-8">
          Start Shopping
        </Button>
      </Link>
    </div>
  );
};

// Main cart page component
export default function CartPage({}) {
  const token = getCookie("floranza-g-token");
  const { data: cart_items, isLoading } = useViewCart(token);
  const cart = cart_items?.data;
  const cartIsEmpty = !cart?.cart?.length;

  return (
    <div className="container-md py-8 font-lora">
      <div className="flex items-center gap-3 mb-6">
        
        {!cartIsEmpty && (
          <span className="text-gray-500 ml-2">
            ({cart?.cart?.length} {cart?.cart?.length === 1 ? 'item' : 'items'})
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <Loader  />
        </div>
      ) : cartIsEmpty ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Product list */}
            <div className="space-y-4">
              {cart?.cart?.map((item: any) => (
                <CartItem key={item?.id} data={item} />
              ))}
            </div>
            
           
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <OrderSummary cart={cart} />
            
           
          </div>
        </div>
      )}
    </div>
  );
}