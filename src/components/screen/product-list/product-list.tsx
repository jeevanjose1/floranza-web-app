"use client";

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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { calculate_product_price, g_event_view_item_list, generate_pagination } from "@/lib/utils";
import NotFound from "@/components/common/not-found";
import Loader from "@/components/common/loader";
import ProductCardWrapper from "@/components/common/product-card-wrapper";

type Props = {
  slug: string;
  queryParams: any;
  search?: string;
};

export default function ProductList({
  slug,
  queryParams,
  search,
}: Props) {
  const pathname = usePathname();
  const base_url = pathname.split("/page/")[0];
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const {
    data: product_list,
    isLoading,
    error,
  } = useGetProductList({
    slug: slug,
    filter: {
      page: queryParams?.page,
      per_page: queryParams?.per_page || 2,
      material: queryParams?.material,
      size: queryParams?.size,
      min_price: queryParams.min_price,
      max_price: queryParams.max_price,
      name: search,
    },
  }) as any;
  
  useEffect(() => {    
    g_event_view_item_list({
      item_list_id: product_list?.data.category?.name,
      item_list_name: product_list?.data.category?.name,
      items: product_list?.data.products?.map((item:any)=>{
        return {
          item_id: item.id,
          item_name: item.name,
          price: item.sale_price,
          quantity: item.qty,
        }
      }) 
    })
  }, [])
  
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
        is_pre_order: item?.is_pre_order,
        is_new_product: item?.is_new_product
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

  if (isLoading) {
    return (
      <div className="w-full h-100 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (
    !isLoading &&
    (error?.data?.message === "Invalid Slug" || error?.status === 400)
  ) {
    router.push("/404");
    return null;
  }

  if (!isLoading && !filteredData.length) {
    return <NotFound type="product" />;
  }

  return (
    <>
      <div
        className={`grid mb-12 font-poppins ${grid_filter()} gap-y-6 gap-x-4 tablet:gap-6`}
      >
        {filteredData.map((product: any) => (
          <ProductCardWrapper
            id={product?.id}
            key={product.id + Math.random()}
            title={product.title}
            price={product.price}
            image={product.image}
            variation={product.variations}
            slug={product.slug}
            is_prebook={product?.is_pre_order}
            is_new={product?.is_new_product}
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
                href={`${base_url}?${createQueryString('page', (pagination?.current_page - 1).toString())}`}
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
                    href={`${base_url}?${createQueryString('page', item.toString())}`}
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
                href={`${base_url}?${createQueryString('page', (pagination?.current_page + 1).toString())}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}