import Wishlist from '@/components/screen/account/whishlist/wishlist'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div className='flex justify-center gap-3 h-full  text-lg'>
      <Wishlist/>
    </div>
  )
}