import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/ui/custom-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { g_event_checkout, is_authenticated } from "@/lib/utils";
import { country, indianStates } from "@/shared/others/others";
import { address_schema_cart } from "@/shared/validations/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie, setCookie } from "cookies-next/client";
import { CreditCard, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
type AddressFormValues = z.infer<typeof address_schema_cart>;

export const OrderSummary = ({ cart, setState }: { cart: any, setState: any }) => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const subtotal = Number(cart?.sub_total) || 0;
  const shipping = Number(cart?.shipping_charge) || 0;
  // const tax = Math.round(subtotal * 0.18);
  const total = Number(cart?.total);
  const authenticated = is_authenticated();
  const curr_address = getCookie("floranza-c-data")
    ? JSON.parse(getCookie("floranza-c-data") as string)
    : null;

  const filterd_state = indianStates.map((item) => ({
    value: item.code,
    label: item.name,
  }));
  
  const handleCheckoutView = () => {
    g_event_checkout({
      price: cart?.sub_total,
      items: cart?.cart?.map((item: any) => {
        return {
          item_id: item?.cart_id,
          item_name: item?.name,
          price: item?.price,
          quantity: item?.cart_qty,
        }
      })

    })
  }
  const form = useForm<Partial<AddressFormValues>>({
    resolver: zodResolver(address_schema_cart as any),
    values: {
      country: curr_address?.country || "IN",
      state: curr_address?.state || "KL",
    },
  });

  const handleToggleAddressForm = () => {
    setShowAddressForm(!showAddressForm);
  };

  const handleChangeAddress = (values: AddressFormValues) => {
    const data = {
      country: values.country,
      state: values.state,
    };
    setCookie("floranza-c-data", JSON.stringify(data));
    setState(values.state);
    handleToggleAddressForm();
  };

  const state = filterd_state?.find(
    (item) => item?.value === curr_address?.state
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>

       {shipping != 0 && <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? "Free" : `₹${shipping.toLocaleString()}`}
          </span>
        </div>
}
        {/* <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (18% GST)</span>
          <span className="font-medium">₹{tax.toLocaleString()}</span>
        </div> */}

        <Separator className="my-3" />

        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Ship to</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-main hover:text-main/80 p-0 h-auto font-medium"
            onClick={handleToggleAddressForm}
          >
            {showAddressForm ? "Cancel" : "Change"}
          </Button>
        </div>
        
        <div className="text-sm text-gray-600">
          {!authenticated ? (curr_address?.state ? state?.label : "Kerala") : "Kerala"}
        </div>

        {showAddressForm && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleChangeAddress as any)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Country/Region</FormLabel>
                      <FormControl>
                        <CustomSelect
                          value={country.filter((item) => item.value == field.value)}
                          onChange={(e: any) => field.onChange(e.value)}
                          options={country}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">State/County</FormLabel>
                      <FormControl>
                        <CustomSelect
                          value={filterd_state.filter((item) => item.value == field.value)}
                          onChange={(e: any) => field.onChange(e.value)}
                          isSearchable
                          options={filterd_state}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2 pt-2">
                  <Button variant="primary" size="sm" type="submit">
                    Update
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleToggleAddressForm}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>

      {/* Checkout Button */}
      <Link href={'/checkout'}>
       <Button variant="primary" onClick={handleCheckoutView} className="w-full mb-4">
        Proceed to Checkout
      </Button>
      </Link>
     

      {/* Security Info */}
      <div className="space-y-2 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <CreditCard className="w-3 h-3" />
          <span>Secure payment</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="w-3 h-3" />
          <span>Free shipping inside Kerala</span>
        </div>
      </div>
    </div>
  );
};