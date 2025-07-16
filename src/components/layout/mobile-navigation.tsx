"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Menu, Search, X, LogOut } from "lucide-react";
import { Input } from "../ui/input";
import Image from "next/image";
import { images } from "@/shared/images/images";
import Link from "next/link";
import { capitalize_first_letters, is_authenticated } from "@/lib/utils";
import { useAccountDetails } from "@/services/queries/account";
import { useLogout } from "@/services/queries/auth";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next/client";

export default function MobileNavigation({ categories }: any) {
  const [open, setOpen] = useState(false);
  const { data: user_data } = useAccountDetails();
  const is_auth = is_authenticated();
  const { mutateAsync: logout } = useLogout();
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    logout().then(() => {
      deleteCookie("floranza-t-value");
      router.refresh();
    });
  };

  // Mock user data - replace with actual user data from your auth system
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/api/placeholder/40/40", // Replace with actual avatar
    isLoggedIn: true, // Replace with actual auth state
  };

  const navigationItems = [
    { href: "/", label: "Home" },
    // { href: "/pre-book", label: "Pre Book" },
    { href: "/tracking", label: "Orders Tracking" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact-us", label: "Contact" },
  ];

  return (
    <Drawer onOpenChange={setOpen} open={open} direction="left">
      <DrawerTrigger onClick={() => setOpen(true)}>
        <Menu strokeWidth={2} className="w-6 h-6" />
      </DrawerTrigger>
      <DrawerContent className="h-full z-100  w-100">
        {/* Header */}
        <DrawerHeader className="border-b py-3">
          <DrawerTitle className="flex items-center justify-between p-2">
            <Image
              src={images.logo}
              width={100}
              height={40}
              alt="logo"
              className="object-contain"
            />
            <Button
              onClick={handleClose}
              variant={"ghost"}
              size={"icon"}
              className="hover:bg-white/50 dark:hover:bg-black/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </DrawerTitle>
        </DrawerHeader>

        {/* Search Bar */}
      

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto">
          <nav aria-label="Main navigation" className="p-4">
            {/* Main Navigation */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Navigation
              </h3>
              <ul className="space-y-1">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleClose}
                      className="block px-3 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 font-medium"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            {categories && categories.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Categories
                </h3>
                <ul className="space-y-1">
                  {categories.map((item: any) => (
                    <li key={item.id}>
                      <Link
                        href={`/product-catogery/${item?.slug}`}
                        onClick={handleClose}
                        className="block px-3 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 font-medium"
                      >
                        {capitalize_first_letters(item.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </nav>
        </div>

        {/* Account Section */}
        <div className="border-t p-4 mt-auto">
          {is_auth ? (
            <div className="flex  flex-col gap-3 ">
              {/* Simple User Info */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-muted-foreground/10  rounded-full flex items-center justify-center ext-sm font-medium">
                  {user_data?.data?.username?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {user_data?.data?.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user_data?.data?.email}
                  </p>
                </div>
              </div>

              {/* Logout Icon */}
             
              <Button
                variant="secondary"
                
                size="sm"
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              >
                Logout
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            /* Login Button */
            <Link href={'/signin'}>
             <Button onClick={handleClose} variant={'secondary'} className="w-full">
              Sign In
            </Button>
            </Link>
           
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
