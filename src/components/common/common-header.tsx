import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'

type Props = {title:string}

export default function CommonHeader({title}: Props) {
  return (
    <div className='w-full mb-12 h-40 tablet-lg:h-65 flex items-center justify-center bg-[url(/images/common-bg.jpeg)]'>

        <div className='flex items-center justify-center gap-2'>
            <Button size={'icon'} variant={'transparant'}><ArrowLeft strokeWidth={3} className="[&_svg:not([class*='size-'])]:size-16 text-white "/></Button>
        <h1 className=' text-2xl tablet:text-4xl tablet-lg:text-5xl  max-w-200 line-clamp-2 font-semibold text-white font-lora'>{title}</h1>
        </div>
           
    </div>
  )
}