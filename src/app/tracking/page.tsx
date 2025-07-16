'use client'
import CommonHeader from '@/components/common/common-header'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useTrackOrder } from '@/services/queries/common'
import { Search, Package, MapPin, Truck, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {}



export default function Page({}: Props) {
    const { mutateAsync: track, isPending, error, data } = useTrackOrder() as any
    const [orderNumber, setOrderNumber] = useState<string>('')
    
    const handleChange = (e: string) => {
        setOrderNumber(e)
    }
    
    const handleSubmit = () => {
        if (orderNumber.trim()) {
            track(orderNumber.trim())
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }
  
    return (
        <main className="w-full">
            <CommonHeader title="Track your order" />

            <section className="container mx-auto tablet:px-4 px-2 font-lora py-12">
                <div className="max-w-2xl mx-auto mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Search className="w-5 h-5" />
                                Enter Order Details
                            </CardTitle>
                            <CardDescription>
                                Enter your order number to get the latest updates
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2 flex-col tablet:flex-row">
                                <Input
                                    placeholder="Order Number"
                                    value={orderNumber}
                                    onChange={(e) => handleChange(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="flex-1"
                                />
                                <Button 
                                    onClick={handleSubmit}
                                    disabled={orderNumber.trim() === '' || isPending}
                                    variant={'primary'}
                                    className="px-6"
                                >
                                    {isPending ? 'Tracking...' : 'Track'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Error Display */}
                 {error && (
                    <div className="max-w-2xl mx-auto mb-8">
                        <Alert className="border-red-200 bg-red-50">
                            <AlertDescription className="text-red-700">
                                {error?.data?.message || 'Failed to track order. Please try again.'}
                            </AlertDescription>
                        </Alert>
                    </div>
                )}

                {/* Order Details Display */}
                {data?.success && data?.data && (
                    <div className="max-w-2xl mx-auto space-y-6">
                        {/* Order Status Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="w-5 h-5" />
                                    Order Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-600">Order Number:</span>
                                    <span className="font-mono text-sm">{data.data.order_no}</span>
                                </div>
                                
                               
                                
                                <div className="flex items-center flex-wrap justify-between">
                                    <span className="text-sm font-medium text-gray-600">Order Date:</span>
                                    <span className="text-sm flex items-center gap-1">
                                        {data.data.order_date}
                                    </span>
                                </div>
                                
                                {data.data.courier && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600">Courier:</span>
                                        <span className="text-sm flex items-center gap-1">
                                            <Truck className="w-4 h-4" />
                                            {data.data.courier}
                                        </span>
                                    </div>
                                )}
                                
                                {data.data.track_id && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600">Tracking ID:</span>
                                        <span className="font-mono text-sm">{data.data.track_id}</span>
                                    </div>
                                )}
                                
                                {data.data.track_url && (
                                    <div className="pt-2">
                                        <Link
                                            href={data.data.track_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 text-sm underline"
                                        >
                                            Track on Courier Website →
                                        </Link>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Shipping Address Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    Shipping Address
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="font-medium">{data.data.address.fname}</div>
                                    <div className="text-sm text-gray-600">
                                        {data.data.address.address_1}
                                        {data.data.address.address_2 && (
                                            <><br />{data.data.address.address_2}</>
                                        )}
                                        <br />
                                        {data.data.address.city}, {data.data.address.state} - {data.data.address.postcode}
                                        <br />
                                        {data.data.address.country}
                                    </div>
                                    <div className="pt-2 space-y-1">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Phone className="w-4 h-4" />
                                            {data.data.address.phone}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Mail className="w-4 h-4" />
                                            {data.data.address.email}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </section>
        </main>
    )
}