"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import CustomSelect from "@/components/ui/custom-select";
import { country, indianStates } from "@/shared/others/others";
import { useAccountDetails, useAddAddress, useListAdderss } from "@/services/queries/account";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { address_schema } from "@/shared/validations/account";



// Define the type for our form
type AddressFormValues = z.infer<typeof address_schema>;

const filterd_state = indianStates.map((item) => {
  return {
    value: item.code,
    label: item.name,
  };
});

export default function AddressForm() {
  const { data: address } = useListAdderss();
  const { data: user_data } = useAccountDetails()

  const router = useRouter();
  const { mutateAsync: add, isPending } = useAddAddress();

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(address_schema as any),
    values: {
      firstName: address?.data?.fname || "",
      country: address?.data?.country || "IN",
      addressLine1: address?.data?.address_1 || "",
      addressLine2: address?.data?.address_2 || "",
      city: address?.data?.city || "",
      state: address?.data?.state || "",
      postcode: address?.data?.postcode || "",
      phone: address?.data?.phone || "",
      email: address?.data?.email || user_data?.data?.email || "",
    },
  });

  function onSubmit(values: AddressFormValues) {
    const form_data = new FormData();
    form_data.append("fname", values.firstName);
    form_data.append("country", values.country);
    form_data.append("address_1", values.addressLine1);
    form_data.append("address_2", values.addressLine2 as string);
    form_data.append("postcode", values.postcode);
    form_data.append("phone", values.phone);
    form_data.append("state", values.state);
    form_data.append("city", values.city);
    form_data.append("email", values.email);


    add(form_data, {
      onSuccess: () => {
        toast.success("Address updated");
        router.replace("/account/addresses");
      },
      onError: (error: any) => {
        toast.error(error?.data?.message)
      },
    });

  }

  return (
    <div className="w-full max-w-full ">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Address</h2>
        <p className="text-sm">Enter your address details below.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Country/Region */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country/Region</FormLabel>
                  <FormControl >
                    <CustomSelect
                      ref={field.ref}
                      value={country.filter((item) => item.value == field.value)}
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
          </div>





          {/* Street Address */}
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address Line 1</FormLabel>
                <FormControl>
                  <Input
                    placeholder="House number and street name"
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
                <FormLabel>Street Address Line 2 (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Apartment, suite, unit, etc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Town/City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Town/City</FormLabel>
                  <FormControl>
                    <Input placeholder="Town/City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* State/County */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/County</FormLabel>
                  <FormControl>
                    <CustomSelect
                      ref={field.ref}
                      value={filterd_state.filter(item => item.value == field.value)}
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

          {/* Postcode/ZIP */}
          <FormField
            control={form.control}
            name="postcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postcode/ZIP</FormLabel>
                <FormControl>
                  <Input placeholder="Postcode/ZIP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-end">
            <Button type="submit" variant={"primary"} className="w-44">
              {isPending ? "Saving..." : "Save Address"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
