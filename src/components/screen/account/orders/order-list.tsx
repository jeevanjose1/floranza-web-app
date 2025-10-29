'use client'
import { useListOrder } from '@/services/queries/account'
import React from 'react'
import { Package, Calendar, ShoppingBag } from 'lucide-react'
import Loader from '@/components/common/loader'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


export default function OrderList() {
    const { data: order_list, isLoading } = useListOrder()

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    if (!order_list?.data?.data || order_list?.data?.data?.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="text-center py-12">
                    <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                    <p className="text-gray-500">You haven&apos;t placed any orders yet.</p>
                </div>
            </div>
        )
    }

    const getStatusColor = (status: number) => {
        switch (status) {
            case 1: return 'bg-yellow-100 text-yellow-800'
            case 2: return 'bg-orange-100 text-orange-800'
            case 3:
            case 33: return 'bg-blue-100 text-blue-800'
            case 4: return 'bg-green-100 text-green-800'
            case 5: return 'bg-red-100 text-red-800'
            case 6: return 'bg-purple-100 text-purple-800'
            case 7: return 'bg-gray-100 text-gray-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusText = (status: number) => {
        switch (status) {
            case 1: return 'Processing'
            case 2: return 'Packing'
            case 3:
            case 33: return 'Shipping'
            case 4: return 'Shipping Completed'
            case 5: return 'Under Production'
            case 6: return 'Refund'
            case 7: return 'Canceled'
            default: return 'Unknown'
        }
    }


    return (
        <div className="w-full ">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                <p className="text-gray-600">Track your recent orders</p>
            </div>

            <div className="space-y-4">
                {order_list?.data?.data?.map((order: any) => (
                    <div key={order.id} className="bg-white rounded-lg  border border-muted-foreground/20 p-6 transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex flex-col tablet:flex-row items-start gap-4">
                                <Package className="h-5 w-5 text-muted-foreground/90 mt-1 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-col tablet:flex-row tablet:items-center items-start gap-3 mb-2">
                                        <h3 className="font-semibold text-muted-foreground">#{order.order_no}</h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.order_status)}`}>
                                            {getStatusText(order.order_status)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground/90 mb-3">
                                        <Calendar className="h-4 w-4" />
                                        <span>{order.date}</span>
                                        <span>•</span>
                                        <span>{order.order_items.length} item{order.order_items.length > 1 ? 's' : ''}</span>
                                    </div>

                                    <div className="flex items-center gap-3">

                                        <div className="">
                                            <p className="text-sm text-muted-foreground whitespace-pre-wrap break-all line-clamp-2">
                                                {order.order_items[0].product_name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Size: {order.order_items[0].product_variation}
                                                {order.order_items.length > 1 && (
                                                    <span className="ml-2">+{order.order_items.length - 1} more</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:items-end gap-2">
                                <div className="text-right">
                                    <p className="text-lg font-semibold text-muted-foreground">
                                        ₹{order.price.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {order.paid_status === 1 ? 'Paid' : 'Unpaid'}
                                    </p>
                                </div>
                                <Link href={`/account/orders/${order?.id}`}>
                                <Button variant={'primary'}>
                                    View Details
                                </Button>
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}