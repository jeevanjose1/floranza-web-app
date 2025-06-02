import CommonHeader from '@/components/common/common-header'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <main className="w-full ">
      <CommonHeader title="Shipping & Delivery Policy" />

      <section className="container mx-auto tablet:px-4 px-2 font-lora py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          
          <h1 className="text-3xl font-bold mb-8 ">SHIPPING & DELIVERY POLICY</h1>
          
          <h2 className="text-2xl font-bold mb-6">Domestic Shipping:</h2>
          <p className="mb-6">
            All the confirmed domestic orders (except pre-booking products) shall be dispatched from our store within 3 working days and It may take around 5-10 working days for the shipment to be delivered.
          </p>

          <h2 className="text-2xl font-bold mb-6">International Shipping:</h2>
          <p className="mb-6">
            For International orders item shall be dispatched from our store within 7- 10 working days and it shall be delivered with in 14- 21 days.
          </p>

          <h2 className="text-2xl font-bold mb-6">International Customs Charges:</h2>
          <p className="mb-6">
            Some destination countries charge customs on the shipments. All customs charges, local taxes, and delivery company&apos;s processing fees for clearing customs are to be borne by the customer unless it is charged at checkout.
          </p>

        </div>
      </section>
    </main>
  )
}