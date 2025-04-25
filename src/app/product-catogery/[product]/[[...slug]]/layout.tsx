import CommonHeader from '@/components/common/common-header'
import FilterHead from '@/components/screen/product-list/filter-head'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode;
  
}

export default async function Layout({ children }: Props) {
 

  return (
    <main className="w-full mb-12">
      <CommonHeader title="Kurti" />
      <FilterHead />
      {children}
    </main>
  )
}