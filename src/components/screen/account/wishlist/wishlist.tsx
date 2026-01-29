'use client'
import Loader from '@/components/common/loader'
import ProductCardOne from '@/components/common/product-card-one'
import { calculate_product_price } from '@/lib/utils'
import { useGetWishlist } from '@/services/queries/product'
import { images } from '@/shared/images/images'
import Image from 'next/image'
import React from 'react'

export default function Wishlist() {
    const { data: wishlist, isLoading } = useGetWishlist({
        filter: {
            page: 1
        }
    })
    const filteredData =
        wishlist?.data?.data?.map((item: any) => {
            return {
                id: item?.id,
                title: item?.name,
                price: calculate_product_price(item),
                image: item?.images?.large,
                variations: item?.variations,
                slug: item?.slug,
                is_pre_order: item?.is_pre_order,
                is_new_product: item?.is_new_product,
                wishlist_id: item?.wishlist_id
            };
        }) || [];

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }
    if (!isLoading && !filteredData.length) {
        return <div className='container h-80 flex flex-col  items-center justify-center '>
            <Image src={images.empty_box} width={300} height={300} alt='empty' className='opacity-70' />
            <p className='text-lg text-muted-foreground/80 font-semibold'>This wishlist is empty.

            </p>
        </div>;
    }

    return (
        <div>
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                </div>
                <p className="text-muted-foreground text-sm">
                    {filteredData.length} {filteredData.length === 1 ? 'item' : 'items'} saved for later
                </p>
            </div>
            <div
                className={`grid mb-12 font-poppins tablet-lg:grid-cols-2 laptop:grid-cols-3 gap-y-6 gap-x-4 tablet:gap-6`}
            >
                {filteredData.map((product: any) => (
                    <ProductCardOne
                        id={product?.id}
                        key={product.id + Math.random()}
                        title={product.title}
                        price={product.price}
                        image={product.image}
                        variation={product.variations}
                        slug={product.slug}
                        is_prebook={product?.is_pre_order}
                        is_new={product?.is_new_product}
                        is_wishlist
                        wishlist_id={product?.wishlist_id}
                    />
                ))}
            </div>
        </div>
    )
}