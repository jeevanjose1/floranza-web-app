"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  MapPin,
  Phone,
  Package,
  Truck,
  Shield,
  Ship,
} from "lucide-react";
import CustomSelect from "@/components/ui/custom-select";
import { country, indianStates } from "@/shared/others/others";
import { useAccountDetails, useListAdderss } from "@/services/queries/account";
import { is_authenticated } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { getCookie } from "cookies-next/client";
import { useCheckoutCart, useViewCart } from "@/services/queries/cart";
import { useRouter } from "next/navigation";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { useRazorpayStatus } from "@/services/queries/payment";
import Loader from "@/components/common/loader";
import { toast } from "sonner";

const filterd_state = indianStates.map((item) => {
  return {
    value: item.code,
    label: item.name,
  };
});

// Form validation schema
const checkoutSchema = z.object({
  fullName: z.string().min(2, " Name must be at least 2 characters"),
  country: z.string().min(1, "Please select a country"),
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(1, "Please select a state"),
  postcode: z.string().min(4, "Valid postcode is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  courier: z.string().min(1, "Please select a courier"),
  paymentMethod: z.string().min(1, "Please select a payment method"),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { Razorpay } = useRazorpay();

  const authenticated = is_authenticated();
  const { data: address } = useListAdderss(authenticated);
  const token = getCookie("floranza-g-token");
  const { mutateAsync: checkout, isPending } = useCheckoutCart();
  const [existingAddress, setExistingAddress] = useState<any>(false);
  const { data: account } = useAccountDetails();
 
  const router = useRouter();
 const {mutateAsync:get_status,isPending:rasorPending} = useRazorpayStatus()
  const state_cookie = getCookie("floranza-c-data")
    ? JSON.parse(getCookie("floranza-c-data") as string)
    : null;

  const handleSelectExistingAddress = (e: any) => {
    if (e) {
      setExistingAddress(address?.data);
    } else {
      setExistingAddress(false);
    }
  };

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),

    values: {
      fullName: existingAddress?.fname || "",
      country: existingAddress?.country || "IN",
      addressLine1: existingAddress?.address_1 || "",
      addressLine2: existingAddress?.address_2 || "",
      city: existingAddress?.city || "",
      state: existingAddress?.state || state_cookie?.state || "",
      postcode: existingAddress?.postcode || "",
      phone: existingAddress?.phone || "",
      email: account?.data?.email || "",
      courier: "",
      paymentMethod: "RAZORPAY",
      notes: "",
    },
  });
 const { data: cart_items } = useViewCart({
    token: token,
    filter: { state: form.watch('state') },
  });
  const handleRazorpaySubmit = (response: any) => {
    const razorpay_data = response?.pg?.RAZORPAY;
    const options: RazorpayOrderOptions = {
      key: razorpay_data?.key,
      amount: response?.total,
      currency: "INR",
      name: razorpay_data?.name,
      description: razorpay_data?.description,
      order_id: razorpay_data?.order_id,
      handler: (response) => {
        console.log(response);
       get_status(response?.razorpay_payment_id,{
        onSuccess:()=>{
            router.replace('/payment-success')
        },
         onError:()=>{
            router.replace('/payment-failed')
        },
       })
      },
      prefill: {
        name: form.getValues("fullName"),
        email: razorpay_data?.contact,
        contact: razorpay_data?.email,
      },
      theme: {
        color: "#F37254",
      },
    };
    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  const onSubmit = (data: CheckoutFormData) => {
    const form_data = new FormData();
    form_data.append("fname", data?.fullName);
    form_data.append("country", data?.country);
    form_data.append(
      "address_1",
      `${data?.addressLine1}, ${data?.addressLine2}`
    );
    form_data.append("city", data?.city);
    form_data.append("state", data?.state);
    form_data.append("postcode", data?.postcode);
    form_data.append("phone", data?.phone);
    form_data.append("email", data?.email);
    form_data.append("courier", data?.courier);
    form_data.append("notes", data?.notes as string);
    form_data.append("order_via", "WEB");
    form_data.append("pg", data?.paymentMethod);
    form_data.append("promo_code", "0");

    checkout(
      {
        data: form_data,
        token: token,
      },
      {
        onSuccess: (response) => {
            const payment_type = Object.keys(response?.data?.pg)?.[0]
          if (payment_type=== "RAZORPAY") {
            handleRazorpaySubmit(response?.data);
          }
        },
        onError: (error:any) => {
          toast.error(error?.data?.message)
        },
      }
    );
    // Handle form submission
  };

//   if (!cart_items?.data?.cart?.length) {
//     router.replace("/");
//   }

  if(rasorPending){
    return <div className="min-h-screen w-full flex items-center justify-center">
          <Loader/>
    </div>
  }

  return (
    <main className="min-h-screen font-lora">
      <div className="container-md mx-auto px-4 py-8 ">
        {/* Progress Indicator */}
        <div className=" mb-6 w-full mobile-lg:inline-block rounded-lg shadow-none border-gray-200">
          <div className="flex items-center justify-between text-xs mobile-lg:text-sm ">
            <div className="flex tablet:flex-row flex-col items-center gap-2">
              <div className="w-6 h-6 bg-main rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <span className="font-semibold text-main">Cart</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-4 rounded-full">
              <div className="h-full bg-main rounded-full w-full"></div>
            </div>
            <div className="flex tablet:flex-row flex-col  items-center gap-2">
              <div className="w-6 h-6 bg-main rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <span className="text-main">Checkout</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-4 rounded-full"></div>
            <div className="flex tablet:flex-row flex-col  items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-xs font-bold">3</span>
              </div>
              <span className="text-gray-500">Complete</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Billing Information */}
          <div className="lg:col-span-3">
            <Card className="shadow-none">
              <CardHeader className=" p-4 pt-0 ">
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <Ship className="w-6 h-6 text-main" />
                  Billing Address
                </CardTitle>
                <p>Please fill in your billing information</p>
              </CardHeader>
              <CardContent className="tablet:px-6 px-4">
                {authenticated && (
                  <>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Select Address
                      </h3>

                      <Card className=" shadow-none py-0 cursor-pointer hover:border-2">
                        <CardContent className="p-4">
                          <Label className="flex items-start gap-3 cursor-pointer">
                            <Checkbox
                              onCheckedChange={handleSelectExistingAddress}
                              className="mt-1"
                            />
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-bold">
                                  {address?.data?.fname}
                                </p>

                                <Badge
                                  variant="secondary"
                                  className="font-bold"
                                >
                                  {address?.data?.phone}
                                </Badge>
                              </div>

                              <div className="text-sm flex gap-2 flex-wrap text-gray-600">
                                <p className="leading-relaxed">
                                  {address?.data?.address_1}
                                  {address?.data?.address_2 &&
                                    `, ${address?.data?.address_2}`}
                                </p>
                                <div className="flex items-center gap-2 ">
                                  <span>
                                    {address?.data?.city},{" "}
                                    {address?.data?.state}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="font-mono text-xs"
                                  >
                                    {address?.data?.postcode}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </Label>
                        </CardContent>
                      </Card>
                    </div>

                    <Separator className="my-6" />
                  </>
                )}

                <Form {...form}>
                  <form action="">
                    <div className="space-y-6">
                      {/* Personal Information */}
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your first name"
                                className=""
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Address Information */}
                      <div className="pt-4">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-main" />
                          Address Details
                        </h3>

                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">
                                  Country/Region *
                                </FormLabel>
                                <FormControl>
                                  <CustomSelect
                                    value={country.filter(
                                      (item) => item.value == field.value
                                    )}
                                    onChange={(e: any) => {
                                      field.onChange(e.value);
                                    }}
                                    options={country}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="addressLine1"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">
                                  Street Address *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="House number and street name"
                                    className=""
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="addressLine2"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">
                                  Address Line 2
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Apartment, suite, unit, etc. (optional)"
                                    className=""
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">
                                    City *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter city"
                                      className=""
                                      {...field}
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
                                  <FormLabel className="text-sm font-medium">
                                    State *
                                  </FormLabel>
                                  <FormControl>
                                    <CustomSelect
                                      value={filterd_state.filter(
                                        (item) => item.value == field.value
                                      )}
                                      onChange={(e: any) => {
                                        field.onChange(e.value);
                                      }}
                                      isSearchable
                                      options={filterd_state}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="postcode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">
                                  Postcode/ZIP *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter postcode"
                                    className=""
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="pt-4">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Phone className="w-5 h-5 text-main" />
                          Contact Information
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium flex items-center gap-2">
                                  Phone *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter phone number"
                                    type="tel"
                                    className=""
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium flex items-center gap-2">
                                  Email *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter email address"
                                    type="email"
                                    className=""
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Shipping Options */}
                      <div className="pt-4">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Truck className="w-5 h-5 text-main" />
                          Shipping Options
                        </h3>

                        <FormField
                          control={form.control}
                          name="courier"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Select Courier *
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid mobile-lg:grid-cols-2 gap-4 mt-2"
                                >
                                  <Label
                                    htmlFor="dtdc"
                                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50"
                                  >
                                    <RadioGroupItem value="DTDC" id="dtdc" />
                                    <div className="cursor-pointer flex-1">
                                      <div className="font-medium">DTDC</div>
                                    </div>
                                  </Label>
                                  <Label
                                    htmlFor="post"
                                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50"
                                  >
                                    <RadioGroupItem
                                      value="INDIA_POST"
                                      id="post"
                                    />
                                    <div className="cursor-pointer flex-1">
                                      <div className="font-medium">
                                        India Post
                                      </div>
                                    </div>
                                  </Label>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Order Notes */}
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Order Notes
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any special instructions for your order..."
                                className=" resize-none h-28"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="shadow-none py-4 tablet:py-6 bg-muted/20  top-8">
              <CardHeader className="px-4 tablet:px-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Package className="w-5 h-5 text-main" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-4 tablet:px-6">
                {/* Product Details */}
                <div className="space-y-4">
                  {cart_items?.data?.cart?.map((item: any) => {
                    return (
                      <div key={item?.id} className="flex justify-between  flex-col mobile-lg:flex-row items-start gap-4">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm leading-tight mb-1">
                            {item?.name} - {item?.attributeOption} x{" "}
                            {item?.cart_qty}
                          </h4>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            ₹{item?.total_sale_value}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Separator />

                {/* Order Totals */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{cart_items?.data?.sub_total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">
                      {cart_items?.data?.shipping_charge === 0
                        ? "Free"
                        : cart_items?.data?.shipping_charge}
                    </span>
                  </div>
                 
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-main">
                        ₹{cart_items?.data?.total?.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-600">
                        Includes all taxes
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Payment Methods */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Payment Method
                  </h4>

                  <RadioGroup
                    defaultValue="PHONEPE"
                    onValueChange={(item) => {
                      form.setValue("paymentMethod", item);
                    }}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50">
                      <RadioGroupItem value="PHONEPE" id="phonepay" />
                      <Label
                        htmlFor="phonepay"
                        className="cursor-pointer flex flex-wrap flex-1"
                      >
                        <div className="font-medium">PhonePe</div>
                        <div className="text-sm text-gray-600">
                          Pay with PhonePe UPI
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50">
                      <RadioGroupItem value="CCAVENUE" id="ccavenue" />
                      <Label
                        htmlFor="ccavenue"
                        className="cursor-pointer flex flex-wrap flex-1"
                      >
                        <div className="font-medium">CCAvenue</div>
                        <div className="text-sm text-gray-600">
                          Credit/Debit Card, Net Banking
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50">
                      <RadioGroupItem value="RAZORPAY" id="razopat" />
                      <Label
                        htmlFor="razopat"
                        className="cursor-pointer flex flex-wrap flex-1"
                      >
                        <div className="font-medium">RazorPay</div>
                        <div className="text-sm text-gray-600">
                          Pay with Razorpay UPI
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Security Notice */}
                <div className="bg-green-100/80 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="min-w-4 min-h-4 text-green-600 " />
                    <div className="text-sm text-green-600">
                      <p className="font-medium  mb-1">Secure Checkout</p>
                      <p className="text-xs">
                        Your personal data will be used to process your order
                        and support your experience. View our privacy policy for
                        more details.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  size="lg"
                  className="w-full"
                  variant={"primary"}
                >
                  {isPending
                    ? "Loading..."
                    : ` Place Order • ₹${cart_items?.data?.total?.toFixed(2)}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
