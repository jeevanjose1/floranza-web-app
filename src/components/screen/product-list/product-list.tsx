"use client";

import ProductCardTwo from "@/components/common/product-card-two";
import { useGetProductList } from "@/services/queries/product";
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
import { generate_pagination } from "@/lib/utils";

type Props = {
  slug: string;
  page?: number;
};

export default function ProductList({ slug, page = 1 }: Props) {
  const pathname = usePathname();
  const base_url = pathname.split("/page/")[0];

  const { data: product_list } = useGetProductList({
    slug: slug,
    filter: {
      page: page,
      per_page: 2,
    },
  });

  const pagination = product_list?.data?.pagination;

  const filteredData =
    product_list?.data?.products?.map((item: any) => {
      return {
        id: item?.id,
        title: item?.name,
        price: {
          min: item?.variations?.[0]?.reg_price,
          max: item?.variations?.[0]?.sale_price,
        },
        image: item?.images?.large,
        variations: item?.variations,
        slug:item?.slug
      };
    }) || [];

  const paginationItems = pagination
    ? generate_pagination(pagination.current_page, pagination.last_page)
    : [];

  return (
    <>
      <div className="grid mobile-lg:grid-cols-2 mb-12 font-poppins tablet-lg:grid-cols-3 laptop:grid-cols-4 gap-x-3 gap-y-6 tablet:gap-6">
        {filteredData.map((product: any) => (
          <ProductCardTwo
            key={product.id}
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
