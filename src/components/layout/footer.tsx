import { images } from "@/shared/images/images";
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";


export default function Footer() {
  return (
    <footer className="bg-[url(/images/footer-bg.jpeg)] flex justify-center  bottom-0 w-full font-poppins bg-no-repeat bg-size-[120%] bg-bottom h-90">
     
      <div className="container flex gap-5 tablet:lg:gap-10 pb-12 flex-col items-center justify-center">
      <Separator className="mb-6 max-w-2/3"/>
        <Image src={images.logo} width={0} height={0} className=" w-40 tablet-lg:w-60" alt="logo" />
        <div className="flex items-center justify-center">
          <nav>
            <ul className="flex flex-wrap justify-center items-center gap-x-6 gap-y-1">
              <li className="    laptop:px-2">
                <Link
                  className="font-medium text-[13px] capitalize whitespace-nowrap"
                  href={"/about-us"}
                >
                  ABOUT US
                </Link>
              </li>
              <li className="   laptop:px-2">
                <Link
                  className="font-medium text-[13px] capitalize whitespace-nowrap"
                  href={"/contact-us"}
                >
                  CONTACT US
                </Link>
              </li>
              <li className="   laptop:px-2">
                <Link
                  className="font-medium text-[13px] capitalize whitespace-nowrap"
                  href={"/privacy-policy"}
                >
                  PRIVACY POLICY
                </Link>
              </li>
              <li className="   laptop:px-2">
                <Link
                  className="font-medium text-[13px] capitalize whitespace-nowrap"
                  href={"/terms-and-condition"}
                >
                  TERMS & CONDITION
                </Link>
              </li>
              <li className="   laptop:px-2">
                <Link
                  className="font-medium text-[13px] capitalize whitespace-nowrap"
                  href={"/return-and-exchange"}
                >
                  RETURNS & EXCHANGE
                </Link>
              </li>
              <li className="   laptop:px-2">
                <Link
                  className="font-medium text-[13px] capitalize whitespace-nowrap"
                  href={"shipping-and-delivery"}
                >
                  SHIPPING & DELIVERY{" "}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex justify-center flex-col items-center gap-6">
        <div className="flex justify-center  items-center gap-6">
            <Link target="_blank" href={"https://www.facebook.com/share/16zKh5cia3/"}>
              <div className="w-8 h-8 flex items-center justify-center ring-accent-foreground/40 rounded-full ring-2">
                <Facebook size={16} strokeWidth={0} fill="black" />
              </div>
            </Link>
            <Link target="_blank" href={"https://www.instagram.com/floranzafashion/"} >
              <div className="w-8 h-8 flex items-center justify-center ring-accent-foreground/40 rounded-full ring-2">
                <Instagram strokeWidth={2.5} size={16} />
              </div>
            </Link>
          </div>
          <p className="text-faded-gray font-semibold text-sm">© 2025 Floranza Fashion Boutique. </p>
        </div>
      </div>
    </footer>
  );
}
