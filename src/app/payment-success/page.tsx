'use client'
import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useGetPaymentDetails } from '@/services/queries/payment';
import { useSearchParams } from 'next/navigation';
import Loader from '@/components/common/loader';
import Image from 'next/image';
import { images } from '@/shared/images/images';

type Props = {}

export default function Page({ }: Props) {
  const params = useSearchParams()
  const { data: details, isLoading, error } = useGetPaymentDetails(params.get('order_id') as string)

  const orderData = {
    orderNumber: details?.data?.order_no,
    orderDate: details?.data?.date_normal_format,
    email: details?.data?.address?.email,
    courier: details?.data?.courier,
    is_preorder: Boolean(details?.data?.is_pre_order),
    preorder_data: details?.data?.pre_order_date,
    customerName: details?.data?.address?.fname,
    shippingAddress: {
      name: details?.data?.address?.fname,
      addr_1: details?.data?.address?.address_1,
      addr_2: details?.data?.address?.address_2,

      city: details?.data?.address?.city,
      state: details?.data?.address?.state,
      zipCode: details?.data?.address?.postcode,
      country: details?.data?.address?.fname
    },

    items: details?.data?.order_items?.map((item: any) => {
      return {
        id: item?.id,
        name: item?.product_name,
        quantity: item?.qty,
        price: Number(item?.price),
      }
    }) || [],



    // subtotal: 199.97,
    shipping: details?.data?.shipping_charge,
    // tax: 20.01,
    amount: details?.data?.price,
    discount: details?.data?.promo_discount,
    total: details?.data?.promo_discount ? (Number(details?.data?.price) - Number(details?.data?.promo_discount)) : details?.data?.price,
    paymentMethod: details?.data?.payment_gateway
  };

  if (isLoading) {
    return <div className="conainer flex h-[calc(100vh-400px)] items-center gap-5 justify-center flex-col"> <Loader /></div>
  }
  if (error) return <div className="conainer flex h-[calc(100vh-400px)] items-center gap-5 justify-center flex-col">
    <Image src={images.not_found} width={300} height={300} alt="not found" />
    <p className="text-xl font-semibold mt6">Not found</p>
  </div>
  return (
    <main className="min-h-screen font-lora bg-gray-50">
      <div className="container-md mx-auto px-4 py-8">
        {/* Success Content */}
        <div className="max-w-4xl mx-auto">
          {/* Lottie Animation */}
          <div className="mobile-lg:max-w-100 mobile-lg:h-50 overflow-hidden mx-auto ">
            <DotLottieReact
              src={"/lootie/success.lottie"}
              loop={false}
              autoplay
            />
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h1 className="text-2xl tablet:text-3xl font-bold mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600">
              Thank you for your order. We&apos;ve received your payment and are processing your order.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            {/* Order Header */}
            <div className="border-b border-gray-200 pb-4 mb-6">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <div className=' mb-2 flex flex-wrap items-center gap-2'>
                    <h2 className="text-xl font-semibold text-gray-900">Order Confirmation</h2>
                    {orderData?.is_preorder && (
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-violet-600 tracking-wide uppercase">
                          Pre-order
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-gray-600 ">Order Number:</span>
                      <span className="font-mono font-semibold text-main">{orderData.orderNumber}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="text-gray-900">{orderData.orderDate}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-gray-600">Email:</span>
                      <span className="text-gray-900">{orderData.email}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-gray-600">Courier:</span>
                      <span className="text-gray-900">{orderData.courier}</span>
                    </div>
                    {orderData?.is_preorder && <div className="flex gap-2 flex-wrap">
                      <span className="text-gray-600">Pre-order Date:</span>
                      <span className="text-gray-900">{orderData.preorder_data}</span>
                    </div>}
                  </div>
                </div>

              </div>
            </div>

            {/* Customer & Shipping Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-gray-900">{orderData.shippingAddress.name}</p>
                  <p>{orderData.shippingAddress.addr_1}</p>
                  <p>{orderData.shippingAddress.addr_2}</p>
                  <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zipCode}</p>
                  <p>{orderData.shippingAddress.country}</p>
                </div>
              </div>

            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-4">
                {orderData.items.map((item: any) => (
                  <div key={item.id} className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">

                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 max-w-140 line-clamp-2">{item.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="">
                      <p className="font-semibold text-gray-900">₹
                        {(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-2 mb-4">

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="text-gray-900">₹
                    {orderData.shipping}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Amount:</span>
                  <span className="text-gray-900">₹{orderData.amount}</span>
                </div>
                {orderData.discount > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Discount:</span>
                    <span className="text-green-600">₹{orderData.discount}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center text-lg font-semibold border-t border-gray-200 pt-2">
                <span>Total Paid:</span>
                <span className="text-main">₹
                  {orderData.total < 0 ? 0 : orderData.total}</span>
              </div>
            </div>

            {/* Payment & Delivery Info */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Payment Method: </span>
                  <span className="text-gray-900">{orderData.paymentMethod}</span>
                </div>

              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col tablet:flex-row gap-4 mb-8">
            <Link replace className="flex-1" href={'/'}>
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