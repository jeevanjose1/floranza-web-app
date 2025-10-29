'use client'
import { useListOrder } from '@/services/queries/account'
import { useParams } from 'next/navigation'
import React from 'react'
import { Package, Truck, Calendar, MapPin, Phone, CreditCard, ShoppingBag, ArrowLeft, User, Mail, Copy, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import Loader from '@/components/common/loader'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

export default function OrderDetails({ }: Props) {
    const params = useParams()
    const { data: order_list, isLoading } = useListOrder()
    const order = order_list?.data?.data?.find((item: any) => item?.id === params?.order_id)

    const [copied, setCopied] = React.useState(false)

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }


    const getStatusColor = (status: number) => {
        switch (status) {
            case 1: return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 2: return 'bg-orange-100 text-orange-800 border-orange-200'
            case 3:
            case 33: return 'bg-blue-100 text-blue-800 border-blue-200'
            case 4: return 'bg-green-100 text-green-800 border-green-200'
            case 5: return 'bg-red-100 text-red-800 border-red-200'
            case 6: return 'bg-purple-100 text-purple-800 border-purple-200'
            case 7: return 'bg-gray-100 text-gray-800 border-gray-200'
            default: return 'bg-gray-100 text-gray-800 border-gray-200'
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

    const getStatusIcon = (status: number) => {
        switch (status) {
            case 1: return <Clock className="h-4 w-4" />
            case 2: return <Package className="h-4 w-4" />
            case 3:
            case 33: return <Truck className="h-4 w-4" />
            case 4: return <CheckCircle className="h-4 w-4" />
            case 5: return <AlertCircle className="h-4 w-4" />
            case 6: return <AlertCircle className="h-4 w-4" />
            case 7: return <AlertCircle className="h-4 w-4" />
            default: return <AlertCircle className="h-4 w-4" />
        }
    }

    const subtotal = order?.order_items?.reduce((sum: number, item: any) => sum + (parseFloat(item.price) * item.qty), 0)
    const totalGst = order?.order_items?.reduce((sum: number, item: any) => sum + (parseFloat(item.gst) * item.qty), 0)
    if (isLoading) {
        return (
            <div className='w-full h-full flex items-center justify-between'>
                <Loader />
            </div>
        )
    }

    if (!order) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="text-center py-12">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium  mb-2">Order not found</h3>
                    <p className="text-muted-foreground/90">The order you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                    <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Orders
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto ">
            {/* Header */}
            <div className="mb-8">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold ">Order Details</h1>
                        <p className="text-gray-600 mt-1">Order placed on {order.date_normal_format}</p>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-medium ${getStatusColor(order.order_status)}`}>
                        {getStatusIcon(order.order_status)}
                        {getStatusText(order.order_status)}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Order Information */}
                    <div className="bg-white rounded-md  border border-muted-foreground/20 overflow-hidden">
                        <div className="bg-muted tablet:px-6 px-4 py-3 border-b border-muted-foreground/20">
                            <h2 className="text-base font-semibold  flex items-center gap-2">
                                <Package className="h-4 w-4" />
                                Order Information
                            </h2>
                        </div>
                        <div className="tablet:p-6 p-4">
                            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground/90">Order Number</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-lg font-mono ">#{order.order_no}</p>
                                        <Button
                                            onClick={() => copyToClipboard(order.order_no)}
                                            variant={'ghost'}
                                        >
                                            {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground/80">Order Date</label>
                                    <p className=" mt-1 flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {order.date_normal_format}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground/80">Payment Method</label>
                                    <p className=" mt-1 flex items-center gap-2">
                                        <CreditCard className="h-4 w-4" />
                                        {order.payment_gateway}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground/80">Payment Status</label>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium ml-2 ${order.paid_status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {order.paid_status === 1 ? 'Paid' : 'Unpaid'}
                                    </span>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground/80">Courier</label>
                                    <p className=" mt-1 flex items-center gap-2">
                                        <Truck className="h-4 w-4" />
                                        {order.courier}
                                    </p>
                                </div>
                                {order.track_id && (
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground/80">Tracking ID</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-blue-600 font-mono">{order.track_id}</p>
                                            <Button
                                                onClick={() => copyToClipboard(order.order_no)}
                                                variant={'ghost'}
                                            >
                                                {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white rounded-md  border border-muted-foreground/20 overflow-hidden">
                        <div className="bg-muted px-6 py-3 border-b border-muted-foreground/20">
                            <h2 className="text-base font-semibold  flex items-center gap-2">
                                <ShoppingBag className="h-4 w-4" />
                                Items Ordered ({order.order_items.length})
                            </h2>
                        </div>
                        <div className="tablet:p-6 p-4">
                            <div className="space-y-4">
                                {order.order_items.map((item: any) => (
                                    <div key={item.item_id} className="flex flex-col flex-wrap laptop:flex-row gap-4 p-4 border border-muted-foreground/20 rounded-md">
                                        <Image
                                            src={item.product_image}
                                            alt={item.product_name}
                                            className="w-30 h-30 object-cover rounded-lg flex-shrink-0"
                                            width={200}
                                            height={200}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium  mb-2">{item.product_name}</h3>
                                            <div className="flex  gap-6 flex-wrap text-sm">
                                                <div>
                                                    <span className="text-muted-foreground/90">SKU:</span>
                                                    <p className="font-mono ">{item.sku}</p>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground/90">Size:</span>
                                                    <p >{item.product_variation}</p>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground/90">Quantity:</span>
                                                    <p >{item.qty}</p>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground/90">Price:</span>
                                                    <p className="font-medium ">₹{parseFloat(item.price).toLocaleString()}</p>
                                                </div>
                                            </div>
                                          
                                        </div>
                                      
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Price Summary */}
                    <div className="bg-white rounded-md  border border-muted-foreground/20 overflow-hidden">
                        <div className="bg-muted px-6 py-3 border-b border-muted-foreground/20">
                            <h2 className="text-base font-semibold ">Order Summary</h2>
                        </div>
                        <div className="tablet:p-6 p-4">
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span >₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">GST:</span>
                                    <span >₹{totalGst.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping:</span>
                                    <span >
                                        {order.shipping_charge === 0 ? 'Free' : `₹${order.shipping_charge.toLocaleString()}`}
                                    </span>
                                </div>
                                <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                                    <span>Total:</span>
                                    <span>₹{(subtotal ).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white rounded-md  border border-muted-foreground/20 overflow-hidden">
                        <div className="bg-muted tablet:px-6 px-4 py-3 border-b border-muted-foreground/20">
                            <h2 className="text-base font-semibold  flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Shipping Address
                            </h2>
                        </div>
                        <div className="tablet:p-6 p-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground/90" />
                                    <span className="font-medium ">{order.address.fname}</span>
                                </div>
                                <p className=" pl-6">{order.address.address_1}</p>
                                {order.address.address_2 && (
                                    <p className=" pl-6">{order.address.address_2}</p>
                                )}
                                <p className=" pl-6">
                                    {order.address.city}, {order.address.state} {order.address.postcode}
                                </p>
                                <p className=" pl-6">{order.address.country}</p>
                                <div className="flex items-center gap-2 pt-2">
                                    <Phone className="h-4 w-4 text-muted-foreground/90" />
                                    <span className="">{order.address.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground/90" />
                                    <span className="">{order.address.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {(order?.order_status === 4 && order?.tracking_url !== '') && <div className="bg-white rounded-lg  border border-muted-foreground/20 overflow-hidden">
                        <div className="tablet:p-6 p-4">
                            <div className="space-y-3">
                                <Link href={order?.tracking_url} target='_blank'>
                                    <Button variant={'primary'} >
                                        Track Order
                                    </Button>
                                </Link>




                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}