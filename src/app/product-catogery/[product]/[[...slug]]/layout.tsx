import CommonHeader from '@/components/common/common-header'
import FilterHead from '@/components/screen/product-list/filter-head'
import { capitalize_first_letters } from '@/lib/utils';
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode;
  params: any
}

export async function generateMetadata({
  params,
}: {
  params: { product: string }
}) {
  const param = await params
  const title = param?.product?.split('-').join(' ')
  return {
    title: `${capitalize_first_letters(title)} - Floranza Fashion Boutique`,
    description: capitalize_first_letters(title),
  }
}

export default async function Layout({ children, params }: Props) {
  const param = await params
  const title = param?.product?.split('-').join(' ')

  return (
    <main className="w-full mb-12">
      <CommonHeader title={capitalize_first_letters(title)} />
      <FilterHead />
      {children}
    </main>
  )
}