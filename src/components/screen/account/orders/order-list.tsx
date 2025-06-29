'use client'
import { useListOrder } from '@/services/queries/account'
import React from 'react'

type Props = {}

export default function OrderList({}: Props) {
    const {data:order_list,isLoading} = useListOrder()
    console.log(order_list);
    
  return (
    <div>OrderList</div>
  )
}