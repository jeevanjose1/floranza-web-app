import { Button } from '@/components/ui/button'
import React from 'react'

type Prop = {
  setCount: (count: number) => void
  count: number,
  max?:number,
  disabled?:boolean,
  disableAdd?:boolean,
  disableRemove?:boolean

}

export default function Counter({ setCount, count,max=4,disabled=false ,disableAdd=false,disableRemove=false}: Prop) {
  
  const increment = () => {
    if(count >=max) return false
    setCount(count + 1);
  }

  const decrement = () => {
    setCount(Math.max(0, count - 1));
  }

  return (
    <div className='flex items-center rounded-full flex-grow w-26 border overflow-hidden h-9 justify-between'>
      <Button 
        variant="ghost" 
        disabled={disableRemove || disabled}
        className='rounded-s-full cursor-pointer hover:bg-main hover:text-white h-full text-base px-3 border-e'
        onClick={decrement}
      >
        -
      </Button>
      <p>{count}</p>
      <Button 
        variant="ghost" 
        disabled={disableAdd || disabled}
        className='rounded-e-full cursor-pointer hover:bg-main hover:text-white h-full text-base px-3 border-s'
        onClick={increment}
      >
        +
      </Button>
    </div>
  )
}