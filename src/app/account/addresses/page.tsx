'use client'

import { useListAdderss } from "@/services/queries/account";
import { Edit, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AddressesPage() {
  const { data: addressData, isLoading, error } = useListAdderss();
  
  // Handle loading state
  if (isLoading) {
    return <div className="text-sm">Loading addresses...</div>;
  }
  
  // Handle error state
  if (error) {
    return <div className="text-sm text-red-500">Error loading addresses</div>;
  }
  
  // Get the address data safely
  const address = addressData?.data;
  const hasAddress = address && address.fname;
  
  return (
    <div className="max-w-full">
      <p className="text-muted-foreground text-sm mb-6">
        The following addresses will be used on the checkout page by default.
      </p>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Billing Address</h2>
        <Link
          className="flex items-center gap-2 text-sm hover:text-muted-foreground transition-colors"
          href="/account/addresses/update"
        >
          {hasAddress ? (
            <>
              <Edit size={16} />
              <span>Edit</span>
            </>
          ) : (
            <>
              <Plus size={16} />
              <span>Add</span>
            </>
          )}
        </Link>
      </div>
      
      {hasAddress && (
        <div className="rounded-md bg-white">
          <div className="border-t pt-4">
            <div className="space-y-1">
              <p className="text-base italic font-medium">{address.fname} {address.lname}</p>
              <p className="text-base italic">{address.address1}</p>
              {address.address_2 && <p className="text-base italic">{address.address_2}</p>}
              <p className="text-base italic">{address.state}, {address.postcode}</p>
              <p className="text-base italic">{address.country}</p>
              {address.company && (
                <p className="text-base italic text-gray-500 mt-2">{address.company}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}