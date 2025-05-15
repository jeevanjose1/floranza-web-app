import CommonHeader from '@/components/common/common-header'
import FilterHead from '@/components/screen/product-list/filter-head'
import React, { ReactNode } from 'react'

type Props = {
	children: ReactNode;
	params:any
}

export default async function Layout({ children,params }: Props) {
	const params_async = await params
	const search_value = params_async?.search?.replaceAll('-',' ')

		return (
			<main className="w-full mb-12">
				<CommonHeader title={`Search - ${search_value}`} />
				<FilterHead category={false} />
				{children}
			</main>
		)
}
