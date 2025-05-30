'use client'
import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {}

export default function page({}: Props) {
  // Mock data - replace with actual order data
  const orderData = {
    orderNumber: "ORD-2025-001234",
    email: "customer@example.com",
    total: "$129.99",
    items: [
      { name: "Premium Wireless Headphones", quantity: 1, price: "$99.99" },
      { name: "Shipping", quantity: 1, price: "$9.99" },
      { name: "Tax", quantity: 1, price: "$20.01" }
    ],
    estimatedDelivery: "June 3-5, 2025"
  };

  return (
    <main className="min-h-screen font-lora ">
      <div className="container-md mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8 w-full hidden mobile-lg:inline-block rounded-lg shadow-none border-gray-200">
          <div className="flex items-center justify-between text-xs mobile-lg:text-sm">
            <div className="flex tablet:flex-row flex-col items-center gap-2">
              <div className="w-6 h-6 bg-main rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <span className="font-semibold text-main">Cart</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-4 rounded-full">
              <div className="h-full bg-main rounded-full w-full"></div>
            </div>
            <div className="flex tablet:flex-row flex-col items-center gap-2">
              <div className="w-6 h-6 bg-main rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <span className="text-main">Checkout</span>
            </div>
            <div className="flex-1 h-1 bg-main mx-4 w-full rounded-full"></div>
            <div className="flex tablet:flex-row flex-col items-center gap-2">
              <div className="w-6 h-6 bg-main rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <span className="text-main font-semibold">Complete</span>
            </div>
          </div>
        </div>

        {/* Success Content */}
        <div className="max-w-xl mt-24 mx-auto">
          {/* Lottie Animation */}
          <div className="mobile-lg:max-w-100  mobile-lg:h-50 overflow-hidden mx-auto">
            <DotLottieReact
              src={"/lootie/success.lottie"}
              loop={false}
              autoplay
            />
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h1 className="text-2xl tablet:text-3xl font-bold  mb-2">
              Payment Successful!
            </h1>
            <p >
              Thank you for your order. We&apos;ve received your payment and are processing your order.
            </p>
          </div>

          {/* Order Summary Card */}
          {/* <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Confirmation</h2>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-mono font-semibold text-main">{orderData.orderNumber}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-900">{orderData.email}</span>
              </div>
            </div>

            
            <div className="space-y-3 mb-4">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex-1">
                    <span className="text-gray-900">{item.name}</span>
                    {item.quantity > 1 && (
                      <span className="text-gray-500 ml-2">× {item.quantity}</span>
                    )}
                  </div>
                  <span className="font-semibold text-gray-900">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Paid:</span>
                <span className="text-main">{orderData.total}</span>
              </div>
            </div>
          </div> */}

         

          {/* Action Buttons */}
          <div className="flex flex-col tablet:flex-row gap-4 mb-8">
            <Link replace className="flex-1 " href={'/'}>
            <Button className="w-full" variant={'primary'}>
              Continue Shopping
            </Button>
            </Link>
            <Link replace className="flex-1" href={'/account/orders'}>
            <Button className="w-full" variant={'secondary'}>
              My Orders
            </Button>
            </Link>
            
          </div>

         
         
        </div>
      </div>
    </main>
  )
}
