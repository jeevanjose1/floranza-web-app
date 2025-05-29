"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  CreditCard,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Package,
  Truck,
  Shield,
  Ship,
} from "lucide-react";
import CustomSelect from "@/components/ui/custom-select";
import { country, indianStates } from "@/shared/others/others";

const filterd_state = indianStates.map((item) => {
  return {
    value: item.code,
    label: item.name,
  };
});

// Form validation schema
const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  companyName: z.string().optional(),
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
  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      country: "IN",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postcode: "",
      phone: "",
      email: "",
      courier: "",
      paymentMethod: "",
      notes: "",
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    // Handle form submission
  };

  return (
    <main className="min-h-screen font-lora">
      <div className="container-md mx-auto px-4 py-8 ">
        {/* Progress Indicator */}
        <div className=" mb-6 w-full rounded-lg shadow-none border-gray-200">
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
              <CardHeader className=" p-4 pt-0 tablet:pb-4">
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <Ship className="w-6 h-6 text-main" />
                  Billing Address
                </CardTitle>
                <p>Please fill in your billing information</p>
              </CardHeader>
              <CardContent className="tablet:px-6 px-4">
                <Form {...form}>
                  <form action="">
                    <div className="space-y-6">
                      {/* Personal Information */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                First Name *
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
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Last Name *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your last name"
                                  className=""
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Company Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter company name (optional)"
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
                                    <RadioGroupItem value="dtdc" id="dtdc" />
                                    <div className="cursor-pointer flex-1">
                                      <div className="font-medium">DTDC</div>
                                    </div>
                                  </Label>
                                  <Label
                                    htmlFor="post"
                                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50"
                                  >
                                    <RadioGroupItem value="post" id="post" />
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
            <Card className="shadow-none py-4 tablet:py-6 bg-muted/20 sticky top-8">
              <CardHeader className="px-4 tablet:px-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Package className="w-5 h-5 text-main" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-4 tablet:px-6">
                {/* Product Details */}
                <div className="space-y-4">
                  <div className="flex justify-between  flex-col mobile-lg:flex-row items-start gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm leading-tight mb-1">
                        Sleeveless Gown in Imported Fabric with Inner - Off
                        White + Black Inner - Size: M x 1
                      </h4>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹1,799.00</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Order Totals */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹1,799.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax (IGST)</span>
                    <span>₹192.75</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-main">
                        ₹1,799.00
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

                  <RadioGroup className="space-y-3">
                    <div className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50">
                      <RadioGroupItem value="phonepay" id="phonepay" />
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
                      <RadioGroupItem value="ccavenue" id="ccavenue" />
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
                  </RadioGroup>
                </div>

                <Separator />

                {/* Security Notice */}
                <div className="bg-main/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-main mt-0.5" />
                    <div className="text-sm text-main">
                      <p className="font-medium mb-1">Secure Checkout</p>
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
                  variant={'primary'}
                >
                  Place Order • ₹1,799.00
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
