import React, { Fragment, useEffect, useState, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Cross, ShoppingBag, X } from "lucide-react";
import {
  useAddToCart,
  useDeleteCart,
  useViewCart,
} from "@/services/queries/cart";
import { getCookie } from "cookies-next/client";
import Image from "next/image";
import Counter from "../screen/product-details/counter";
import { Separator } from "../ui/separator";
import Loader from "./loader";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

type Props = {};
const ItemCard = ({ data, setOpen }: { data: any; setOpen: any }) => {
  const token = getCookie("floranza-g-token");
  const { mutateAsync: remove, isPending } = useDeleteCart();
  const { mutateAsync: add, error } = useAddToCart();

  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/product/${data?.slug}`);
    setOpen(false);
  };

  useEffect(() => {
    setCount(data?.cart_qty);
    prevCountRef.current = data?.cart_qty;
  }, [data?.cart_qty]);

  // This function handles the quantity change and determines increment/decrement
  const handleChangeCount = (newCount: number) => {
    // Calculate if this is an increment (+1) or decrement (-1)
    const qtyChange = newCount > prevCountRef.current ? 1 : -1;

    const form_data = new FormData();
    form_data.append("guest_token", token as string);
    form_data.append("prd_var_value_id", data?.prd_var_value_id);
    form_data.append("product_id", data?.product_id);
    form_data.append("qty", qtyChange.toString()); // Send +1 or -1 as requested

    prevCountRef.current = newCount;

    add(form_data);
  };

  // Custom handler for the Counter component
  const handleCounterChange = (newCount: number) => {
    // Only process if the count actually changed and is valid
    if (newCount !== count && newCount >= 0) {
      // If the new count is 0, call the remove API instead
      if (newCount === 0) {
        handleRemove();
      } else {
        handleChangeCount(newCount);
      }
    }
  };

  const handleRemove = () => {
    remove({
      cart_id: data?.cart_id,
      token: token,
    });
  };

  return (
    <div
      className={`flex items-start gap-4 p-3 border rounded-lg ${
        data?.is_out_of_stock ? "opacity-80" : ""
      } `}
    >
      <div onClick={handleNavigate} className="flex-shrink-0 cursor-pointer">
        <Image
          src={data?.image?.large}
          width={90}
          height={90}
          alt="Product thumbnail"
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex-grow flex flex-col justify-between h-full">
        <h3
          onClick={handleNavigate}
          className="font-medium cursor-pointer text-sm mb-1 line-clamp-2"
        >
          {data?.name}
        </h3>
        <Badge className="rounded-md" variant={"secondary"}>
          {data?.attributeOption}
        </Badge>
        <div className="flex items-start flex-wrap gap-3 mt-2">
          <div className="max-w-28">
            <Counter
              disabled={data?.is_out_of_stock}
              disableAdd={
                error?.data?.message == "the product is currently out of stock."
              }
              count={count}
              setCount={handleCounterChange} // Use our custom handler
            />
            {data?.is_out_of_stock ||
              (error?.data?.message ===
                "the product is currently out of stock." && (
                <p className="mt-1 text-xs text-main italic">Out of stock</p>
              ))}
          </div>

          <div className="flex items-center gap-1 py-1 text-gray-700">
            <span className="text-sm">₹</span>
            <span className="font-semibold">{data?.price}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-1">
          <div className="text-sm text-gray-500">
            Total:{" "}
            <span className="font-medium text-gray-800">
              ₹{data?.total_sale_value}
            </span>
          </div>
          <Button
            onClick={handleRemove}
            variant={"ghost"}
            className="text-main"
            size={"icon"}
          >
            {isPending ? <Loader /> : <X />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function CartSheet({}: Props) {
  const token = getCookie("floranza-g-token");
  const [open, setOpen] = useState(false);

  const { data: cart_items } = useViewCart({
    token: token,
    filter: { state: null },
  });
  const cart = cart_items?.data;
  const cartIsEmpty = !cart?.cart?.length;
  const handleClose = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className={`rounded-full relative [&_svg:not([class*='size-'])]:size-5 `}
          variant="ghost"
          size="icon"
        >
          {!cartIsEmpty && (
            <div className="absolute top-0 left-0 bg-main w-4 h-4 flex items-center justify-center rounded-full ">
              <p className="text-[10px] text-white  ">
                {cart?.cart?.length > 9 ? "9+" : cart?.cart?.length}
              </p>
            </div>
          )}
          <ShoppingBag strokeWidth={2} />
        </Button>
      </SheetTrigger>
      <SheetContent className="font-lora">
        <SheetHeader>
          <SheetTitle>Shopping cart</SheetTitle>
        </SheetHeader>

        {cartIsEmpty ? (
          <div className="flex flex-col items-center justify-center h-100 p-6 text-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/70 mb-4" />
            <h3 className="font-medium text-lg mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground text-sm">
              Add some products to your cart to see them here.
            </p>
          </div>
        ) : (
          <ScrollArea className="max-h-[100%] overflow-auto">
            <div className="mt-3 flex flex-col gap-2 p-3">
              {cart?.cart?.map((item: any) => (
                <Fragment key={item?.id}>
                  <ItemCard setOpen={setOpen} data={item} />
                </Fragment>
              ))}
            </div>
          </ScrollArea>
        )}

        <SheetFooter>
          <Separator className="my-3" />
          <div className="flex w-full justify-between mb-3 ">
            <p className="text-muted-foreground/80">Subtotal:</p>
            <p className="text-main font-semibold">
              {cartIsEmpty ? "₹0" : cart?.total}
            </p>
          </div>
          <Link onClick={handleClose} href={"/cart"}>
            <Button
              variant={"secondary"}
              className="w-full mb-2"
              disabled={cartIsEmpty}
            >
              Go to cart
            </Button>
          </Link>
          <Link onClick={handleClose} href={"/checkout"}>
            <Button
              variant={"primary"}
              className="w-full"
              disabled={cartIsEmpty}
            >
              Checkout
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
