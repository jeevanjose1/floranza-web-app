
import React, { ReactNode } from 'react'

type Props = {
	children: ReactNode;
	params:any
}

export default async function Layout({ children }: Props) {

		return (
			<main className="w-full mb-12">
				{children}
			</main>
		)
}
