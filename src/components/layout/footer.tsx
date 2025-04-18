import { images } from "@/shared/images/images";
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="bg-[url(/images/footer-bg.jpeg)]  bottom-0 w-full font-poppins bg-no-repeat bg-size-[120%] bg-bottom h-90">
      <div className="container flex gap-5 tablet:lg:gap-10 flex-col items-center justify-center">
        <Image src={images.logo} width={0} height={0} className=" w-40 tablet-lg:w-60" alt="logo" />
        <div className="flex items-center justify-center">
          <nav>
            <ul className="flex flex-wrap justify-center items-center gap-x-6 gap-y-1">
              <li className="    laptop:px-2">
                <Link
                  className="font-medium text-[13px] capitalize whitespace-nowrap"
                  href={""}
                >
                  ABOUT US
                </Link>
              </li>
              <li className="   laptop:px-2">
                <Link
                  className="font-medium text-[13px] capitalize whitespace-nowrap"
                  href={""}
                >
                  CONTACT US
                </Link>
              </li>
              <li className="   laptop:px-2">
                <Link
                  className="font-medium text-[13px] capitalize whitespace-nowrap"
                  href={""}
                >
                  PRIVACY POLICY{" "}
                </Link>
              </li>
              <li className="   laptop:px-2">
                <Link
                  className="font-medium text-[13px] capitalize whitespace-nowrap"
                  href={""}
                >
                  TERMS & CONDITION
                </Link>
              </li>
              <li className="   laptop:px-2">
                <Link
                  className="font-medium text-[13px] capitalize whitespace-nowrap"
                  href={""}
                >
                  RETURNS & EXCHANGE
                </Link>
              </li>
              <li className="   laptop:px-2">
                <Link
                  className="font-medium text-[13px] capitalize whitespace-nowrap"
                  href={""}
                >
                  SHIPPING & DELIVERY{" "}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex justify-center flex-col items-center gap-6">
        <div className="flex justify-center  items-center gap-6">
            <Link href={""}>
              <div className="w-8 h-8 flex items-center justify-center ring-accent-foreground/40 rounded-full ring-2">
                <Facebook size={16} strokeWidth={0} fill="black" />
              </div>
            </Link>
            <Link href={""}>
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
