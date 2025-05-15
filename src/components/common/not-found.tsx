import { images } from '@/shared/images/images'
import Image from 'next/image'
import React from 'react'

type Props = {type:'product'|'page'}

export default function NotFound({type}: Props) {
    if(type === 'product'){
        return  <div className='container h-80 flex flex-col  items-center justify-center '>
            <Image src={images.empty_box} width={400} height={400} alt='empty' className='opacity-70'/>
            <p className='text-lg text-muted-foreground/80 font-semibold'>Product not found</p>
        </div>
    }
  return (
    <div className='container h-100 flex items-center justify-center '>NotFound</div>
  )
}