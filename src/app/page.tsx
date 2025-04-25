import FeaturedProducts from "@/components/screen/home/featured-products";
import Hero from "@/components/screen/home/hero";
import LatestProducts from "@/components/screen/home/latest-products";
import MostSellingProducts from "@/components/screen/home/most-selling-products";
import ShopByCatogery from "@/components/screen/home/shop-by-catogery";
import { fetcher } from "@/lib/utils";
import { HOME } from "@/shared/urls/home";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
   
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["SLIDE"],
      queryFn: () => fetcher({ type: "get", url: HOME.SLIDE,authenticated:false }),
      staleTime: Infinity,
    }),
    queryClient.prefetchQuery({
      queryKey: ["LATEST_PRODUCTS"],
      queryFn: () => fetcher({ type: "get", url: HOME.LATEST_PRODUCTS,authenticated:false }),
      staleTime: Infinity,
    }),
    queryClient.prefetchQuery({
      queryKey: ["FEATURED_PRODUCTS"],
      queryFn: () => fetcher({ type: "get", url: HOME.FEATURED_PRODUCTS,authenticated:false }),
      staleTime: Infinity,
    }),
    queryClient.prefetchQuery({
      queryKey: ["MOST_SELLING_PRODUCTS"],
      queryFn: () => fetcher({ type: "get", url: HOME.MOST_SELLING,authenticated:false }),
      staleTime: Infinity,
    }),
    queryClient.prefetchQuery({
      queryKey: ["CATOGERIES"],
      queryFn: () => fetcher({ type: "get", url: HOME.CATOGERIES,authenticated:false }),
      staleTime: Infinity,
    }),
  ]);
  
  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Hero />
        <ShopByCatogery />
        <LatestProducts />
        <FeaturedProducts />
        <MostSellingProducts />
      </HydrationBoundary>
    </main>
  );
}