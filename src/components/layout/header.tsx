"use client";

import { images } from "@/shared/images/images";
import {
  Facebook,
  Heart,
  Instagram,
  ScanSearch,
  Search,
  Send,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import MobileNavigation from "./mobile-navigation";
import { useGetNavigation } from "@/services/queries/common";
import { usePathname } from "next/navigation";


export default function Header() {
  const { data: navigations } = useGetNavigation();

  const pathname = usePathname();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <header className="  tablet-lg:h-36 flex justify-center font-poppins bg-white ">
      <div className="container py-2 flex flex-col  gap-4 justify-center">
        <div className="w-full grid grid-cols-3 ">
          <div className="justify-self-start flex items-center tablet-lg:hidden">
            <MobileNavigation />
          </div>
          <div className=" justify-self-start hidden tablet-lg:flex  items-center gap-3">
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

          <Image
            src={images.logo}
            width={0}
            height={0}
            className="justify-self-center w-30 tablet:w-40"
            alt="Floranza Fashion  Boutique"
          />

          <div className="flex items-center justify-self-end tablet-lg:gap-2">
            <Button
              className="rounded-full hidden laptop:flex has-[>svg]:px-4"
              size={"sm"}
              variant={"primary"}
            >
              Search <ScanSearch strokeWidth={2} />
            </Button>
            <Button
              className="rounded-full laptop:hidden flex [&_svg:not([class*='size-'])]:size-5"
              size={"icon"}
              variant={"ghost"}
            >
              <Search strokeWidth={2} />
            </Button>
            <Button
              className="rounded-full hidden tablet-lg:flex [&_svg:not([class*='size-'])]:size-5 "
              variant={"ghost"}
              size={"icon"}
            >
              <Send strokeWidth={2} />
            </Button>

            <Button
              className="rounded-full hidden tablet-lg:flex [&_svg:not([class*='size-'])]:size-5 "
              variant={"ghost"}
              size={"icon"}
            >
              <Heart strokeWidth={2} />
            </Button>
            <Button
              className="rounded-full hidden tablet-lg:flex [&_svg:not([class*='size-'])]:size-5 "
              variant={"ghost"}
              size={"icon"}
            >
              <UserRound strokeWidth={2} />
            </Button>
            <Button
              className="rounded-full [&_svg:not([class*='size-'])]:size-5 "
              variant={"ghost"}
              size={"icon"}
            >
              <ShoppingBag strokeWidth={2} />{" "}
            </Button>
          </div>
        </div>
        <div className=" items-center hidden font-lora tablet-lg:flex justify-center">
          <nav>
            <ul className="flex items-center gap-4">
              <li className="   laptop:px-2">
                <Link className="font-medium whitespace-nowrap" href={""}>
                  Home
                </Link>
              </li>
              {navigations?.data?.categories?.slice(0, 3)?.map((item: any) => {
                return (
                  <li key={item?.id} className="   laptop:px-2">
                    <Link className="font-medium whitespace-nowrap" href={"/product-catogery/kurthi"}>
                      {item?.name}
                    </Link>
                  </li>
                );
              })}
              <li className="   laptop:px-2">
                <Link className="font-medium whitespace-nowrap" href={""}>
                  Pre Book
                </Link>
              </li>
              <li className="   laptop:px-2">
                <Link className="font-medium whitespace-nowrap" href={""}>
                  Orders Tracking
                </Link>
              </li>
              <li className="   laptop:px-2">
                <Link className="font-medium whitespace-nowrap" href={""}>
                  About Us
                </Link>{" "}
              </li>
              <li className="   laptop:px-2">
                <Link className="font-medium whitespace-nowrap" href={""}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
