"use client";

import { images } from "@/shared/images/images";
import {
  Facebook,
  Heart,
  Instagram,
  LogIn,
  Search,
  SearchIcon,
  Send,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "../ui/button";
import MobileNavigation from "./mobile-navigation";
import { useGetNavigation } from "@/services/queries/common";
import { usePathname, useRouter } from "next/navigation";
import { capitalize_first_letters, is_authenticated } from "@/lib/utils";
import { Input } from "../ui/input";
import { AccountDropdown } from "./account-dropdown";
import { getCookie, setCookie } from "cookies-next/client";
import { useGustToken } from "@/services/queries/auth";
import CartSheet from "../common/cart-sheet";

// Define category type for better type safety
type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function Header() {
  const { data: navigations } = useGetNavigation();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: add_token } = useGustToken();
  // Reset scroll position when pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Auto-focus input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      const focusTimeout = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);

      return () => clearTimeout(focusTimeout);
    }

    if (!getCookie("floranza-g-token")) {
      add_token().then((response) => {
        setCookie("floranza-g-token", response?.data?.guest_token);
      });
    }
  }, [isSearchOpen]);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback(() => {
    if (!searchValue.trim()) return;

    const formattedQuery = searchValue.trim().replaceAll(" ", "-");
    router.push(`/search/${formattedQuery}`);
    setSearchValue("");
    setIsSearchOpen(false);
  }, [searchValue, router]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (searchValue.trim() && e.key === "Enter") {
        handleSearch();
      }
    },
    [searchValue, handleSearch]
  );

  // Extract categories from navigation data safely
  const categories = navigations?.data?.categories || [];
  const is_auth = is_authenticated();
  return (
    <header className="tablet-lg:h-36 flex top-0 sticky justify-center z-50 font-poppins bg-white">
      <div className="container py-2 flex flex-col gap-4 justify-center">
        <div className="w-full grid grid-cols-3">
          {/* Mobile Navigation */}
          <div className="justify-self-start flex items-center tablet-lg:hidden">
            <MobileNavigation categories={categories} />
          </div>

          {/* Social Media Links */}
          <div className="justify-self-start hidden tablet-lg:flex items-center gap-3">
            <SocialIcon
              href="https://www.facebook.com/Floranzafashion/"

              icon={<Facebook size={16} strokeWidth={0} fill="black" />}
            />
            <SocialIcon
              href="https://www.instagram.com/floranzafashion/"
              icon={<Instagram strokeWidth={2.5} size={16} />}
            />
          </div>

          {/* Logo */}
          <Link href="/" aria-label="Floranza Fashion Boutique - Home">
            <Image
              src={images.logo}
              width={0}
              height={0}
              className="justify-self-center w-30 tablet:w-40"
              alt="Floranza Fashion Boutique"
              priority
            />
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center justify-self-end tablet-lg:gap-2">
            {!is_auth && (
              <Link href={"/signin"}>
                <Button
                  className="rounded-full hidden laptop:flex px-4  has-[>svg]:px-4"
                  size="sm"
                  variant="outline"
                  aria-label="Open search"
                >
                  <LogIn strokeWidth={2} />
                  Signin / Register
                </Button>
              </Link>
            )}
            <Button
              className="rounded-full hidden laptop:flex has-[>svg]:px-4"
              size="sm"
              variant="primary"
              onClick={toggleSearch}
              aria-label="Open search"
            >
              Search <SearchIcon strokeWidth={2} />
            </Button>

            <Button
              className="rounded-full laptop:hidden flex [&_svg:not([class*='size-'])]:size-5"
              size="icon"
              variant="ghost"
              onClick={toggleSearch}
              aria-label="Open search"
            >
              <Search strokeWidth={2} />
            </Button>

            {is_auth && (
              <ActionButton
                icon={<Send strokeWidth={2} />}
                label="Messages"
                className="hidden tablet-lg:flex"
              />
            )}
            {is_auth && (
               <Link href={"/account/wishlist"}>
              <ActionButton
                icon={<Heart strokeWidth={2} />}
                label="Wishlist"
                
                className="hidden tablet-lg:flex"
              />
              </Link>
            )}
            {is_auth && (
              <AccountDropdown
                user={{
                  avatar: "",
                  email: "jeevanjose@gmail.com",
                  name: "jeevan",
                }}
              />
            )}
            <CartSheet />
          </div>
        </div>

        {/* Desktop Navigation */}
        <DesktopNavigation categories={categories.slice(0, 3)} />
      </div>

      {/* Search Dropdown */}
      <SearchDropdown
        isOpen={isSearchOpen}
        value={searchValue}
        onChange={setSearchValue}
        onSearch={handleSearch}
        onClose={toggleSearch}
        onKeyDown={handleKeyDown}
        inputRef={searchInputRef as any}
      />
    </header>
  );
}

// Extracted components for better organization and reusability

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link href={href} target="_blank">
      <div className="w-8 h-8 flex items-center justify-center ring-accent-foreground/40 rounded-full ring-2">
        {icon}
      </div>
    </Link>
  );
}

function ActionButton({
  icon,
  label,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <Button
      className={`rounded-full [&_svg:not([class*='size-'])]:size-5 ${className}`}
      variant="ghost"
      size="icon"
      aria-label={label}
    >
      {icon}
    </Button>
  );
}

function DesktopNavigation({ categories }: { categories: Category[] }) {
  return (
    <div className="items-center hidden font-lora tablet-lg:flex justify-center">
      <nav aria-label="Main navigation">
        <ul className="flex items-center gap-4">
          <NavItem href="/">Home</NavItem>

          {categories.map((item) => (
            <NavItem key={item.id} href={`/product-catogery/${item?.slug}`}>
              {capitalize_first_letters(item.name)}
            </NavItem>
          ))}

          {/* <NavItem href="">Pre Book</NavItem> */}
          <NavItem href="/tracking">Orders Tracking</NavItem>
          <NavItem href="/why-floranza">Why Floranza</NavItem>
          <NavItem href="/about-us">About Us</NavItem>
          <NavItem href="/contact-us">Contact</NavItem>
        </ul>
      </nav>
    </div>
  );
}

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li className="laptop:px-2">
      <Link className="font-medium whitespace-nowrap" href={href}>
        {children}
      </Link>
    </li>
  );
}

function SearchDropdown({
  isOpen,
  value,
  onChange,
  onSearch,
  onClose,
  onKeyDown,
  inputRef,
}: {
  isOpen: boolean;
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClose: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div
      className={`w-full absolute transition-all duration-300 ${
        isOpen
          ? "h-20 -bottom-20 opacity-100"
          : "h-0 bottom-0 opacity-0 pointer-events-none"
      } bg-white shadow-lg z-50`}
      aria-hidden={!isOpen}
    >
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center flex-1">
            <Search
              strokeWidth={2}
              size={20}
              className="text-muted-foreground/70"
            />
            <Input
              ref={inputRef}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={onKeyDown}
              type="text"
              value={value}
              placeholder="Search for products..."
              className="w-full border-none outline-none text-base shadow-none focus-visible:ring-0"
              aria-label="Search for products"
            />
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="primary"
              size="sm"
              className="rounded-full"
              disabled={!value.trim()}
              onClick={onSearch}
              aria-label="Search"
            >
              Search
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={onClose}
              aria-label="Close search"
            >
              <X strokeWidth={2} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
