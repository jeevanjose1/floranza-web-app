import { Button } from '@/components/ui/button'
import React from 'react'


export default function Counter() {
  return (
    <div className='flex items-center rounded-full flex-grow w-26 border overflow-hidden h-9 justify-between'>
         <Button variant={'transparant'} className='rounded-s-full cursor-pointer hover:bg-main hover:text-white h-full text-base px-3 border-e'>-</Button>
            <p>1</p>
         <Button variant={'transparant'} className='rounded-e-full cursor-pointer hover:bg-main hover:text-white h-full text-base px-3 border-s'>+</Button>

    </div>
  )
}