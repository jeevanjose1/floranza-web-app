import FeaturedProducts from "@/components/screen/home/featured-products";
import Hero from "@/components/screen/home/hero";
import LatestProducts from "@/components/screen/home/latest-products";
import MostSellingProducts from "@/components/screen/home/most-selling-products";
import ShopByCatogery from "@/components/screen/home/shop-by-catogery";


export default function Home() {
  return (
   <main>
       <Hero/>
       <ShopByCatogery/>
       <LatestProducts/>
       <FeaturedProducts/>
       <MostSellingProducts/>
   </main>
  );
}
