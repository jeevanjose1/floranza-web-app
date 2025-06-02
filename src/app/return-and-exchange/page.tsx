import CommonHeader from '@/components/common/common-header'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <main className="w-full ">
      <CommonHeader title="Return & Exchange" />
      
      <section className="container mx-auto tablet:px-4 px-2 font-lora py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          
          <h1 className="text-3xl font-bold mb-8 ">Floranza Fashion Boutique Exchange/ Return Policy</h1>
          
          <h2 className="text-2xl font-bold mb-6">Overview</h2>
          <p className="mb-4">
            If you have received a damaged or defective product you can return the item. In such case, you need to inform us about the return within 12 hours of product receipt along with parcel opening video. Exchange / Return product(s) must be unused, unworn, unwashed, undamaged, and un-customized.
          </p>
          <p className="mb-4">
            If the product does not reach us within 7 days for domestic and 30 days of International Shipment from the date of delivery, the product is not eligible for return.
          </p>
          <p className="mb-6">
            We will be arranging an exchange with a new item or initiate a refund if the item is not in stock.
          </p>

          <h2 className="text-2xl font-bold mb-6">Refunds</h2>
          <p className="mb-6">
            Once your return is received, inspected, and found okay, within 5-7 working refund will be processed to the original payment method used for placing the order through our website and credit the amount to the customer&apos;s bank account.
          </p>

          <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
            <p className="font-semibold text-yellow-800">
              ⚠️ Important: Opening video of the package received is mandatory for an exchange or refund
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-6">Shipping Returns</h2>
          <p className="mb-4">To return your product, you should mail your product to:</p>
          
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <p className="font-semibold">Return Address:</p>
            <p>Floranza Fashion Boutique</p>
            <p>14/934 Church Road, Thiruvambady</p>
            <p>Calicut – 673603</p>
          </div>

          <p className="mb-4">
            You will be responsible for paying for your shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
          </p>
          <p className="mb-4">
            Depending on where you live, the time it may take for your exchanged product to reach you may vary.
          </p>
          <p className="mb-6">
            If you are returning more expensive items, you may consider using a trackable shipping service or purchasing shipping insurance. We don&apos;t guarantee that we will receive your returned item.
          </p>

          <h2 className="text-2xl font-bold mb-6">Need help?</h2>
          <p className="mb-6">
            Contact us at <strong>support@floranzafashion.com</strong> for questions related to refunds and returns.
          </p>

        </div>
      </section>
    </main>
  )
}