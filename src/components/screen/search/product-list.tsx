"use client";

import ProductCardTwo from "@/components/common/product-card-two";
import { useGetProductList, useGetProductListSearch } from "@/services/queries/product";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname } from "next/navigation";
import React from "react";
import { calculate_product_price, generate_pagination } from "@/lib/utils";
import NotFound from "@/components/common/not-found";
import ProductCardWrapper from "@/components/common/product-card-wrapper";

type Props = {
	slug: string;
	page?: number;
	queryParams: any;
		search?:string
};

export default function ProductList({ slug, page = 1, queryParams,search }: Props) {
	const pathname = usePathname();
	const base_url = pathname.split("/page/")[0];

	const { data: product_list ,isLoading} = useGetProductListSearch({
		slug: slug,
		filter: {
			page: page,
			per_page: queryParams?.per_page || 2,
			material:queryParams?.material,
			size:queryParams?.size,
			min_price:queryParams.min_price,
			max_price:queryParams.max_price,
			name:search
		},
	});

	const pagination = product_list?.data?.pagination;

	const filteredData =
		product_list?.data?.products?.map((item: any) => {
			return {
				id: item?.id,
				title: item?.name,
				price: calculate_product_price(item),
				image: item?.images?.large,
				variations: item?.variations,
				slug: item?.slug,
			};
		}) || [];

	const paginationItems = pagination
		? generate_pagination(pagination.current_page, pagination.last_page)
		: [];

	const grid_filter = () => {
		const grid = queryParams?.view;
		if (grid) {
			if (grid === "grid-4") {
				return "mobile-lg:grid-cols-2  laptop:grid-cols-2";
			} else if (grid === "grid-9") {
				return "mobile-lg:grid-cols-1 tablet-lg:grid-cols-2 laptop:grid-cols-3";
			} else if (grid === "grid-16") {
				return "mobile-lg:grid-cols-2 tablet-lg:grid-cols-3 laptop:grid-cols-4";
			}
		} else {
			return "mobile-lg:grid-cols-2 tablet-lg:grid-cols-3 laptop:grid-cols-4";
		}
	};

		if(!isLoading&&!filteredData.length) {
			return  <NotFound type="product"/>
		}

	return (
		<>
			<div className={`grid mb-12 font-poppins ${grid_filter()} gap-x-4 gap-y-6 tablet:gap-6`}>
				{filteredData.map((product: any) => (
					<ProductCardWrapper
								id={product?.id}
								key={product.id + Math.random()}
								title={product.title}
								price={product.price}
								image={product.image}
								variation={product.variations}
								slug={product.slug}
							  />
				))}
			</div>

			{pagination?.last_page > 1 && (
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								disabled={pagination?.current_page <= 1}
								passHref
								href={`${base_url}/page/${pagination?.current_page - 1}`}
							/>
						</PaginationItem>

						{paginationItems?.map((item, index) => {
							if (item === "ellipsis") {
								return (
									<PaginationItem key={`ellipsis-${index}`}>
										<PaginationEllipsis />
									</PaginationItem>
								);
							}

							return (
								<PaginationItem key={`page-${item}`}>
									<PaginationLink
										href={`${base_url}/page/${item}`}
										passHref
										isActive={pagination.current_page === item}
									>
										{item}
									</PaginationLink>
								</PaginationItem>
							);
						})}

						<PaginationItem>
							<PaginationNext
								disabled={pagination?.current_page === pagination?.last_page}
								passHref
								href={`${base_url}/page/${pagination?.current_page + 1}`}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			)}
		</>
	);
}
