import CommonHeader from '@/components/common/common-header'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <main className="w-full ">
      <CommonHeader title="About Us" />

      <section className="container mx-auto tablet:px-4 px-2 font-lora py-12">
        <div className="max-w-4xl mx-auto bg-white  rounded-xl overflow-hidden border border-muted">
          <div className=" px-4 tablet:px-8 py-10">
            <h1 className="text-4xl font-bold  text-center mb-2">
            <span className="text-main ">Floranza</span> Fashion Boutique
            </h1>
            <p className="text-center text-gray-500 text-lg mb-8">
              Where passion meets fashion.
            </p>

            <div className="prose max-w-none text-gray-700 space-y-6">
              <p>
                <strong>Floranza Fashion Boutique</strong> is a complete ladies fashion store located in
                Thiruvambady, Calicut, Kerala. Floranza is owned by young entrepreneur <strong>Linda Vineeth</strong>, 
                who left her high-paying government nursing job in Qatar to pursue her passion.
              </p>

              <p>
                At Floranza, you’ll discover carefully curated, high-quality, and on-trend dresses at affordable prices. 
                Our goal is to bring fashionable clothing that resonates with the modern Indian woman—without breaking the bank.
              </p>

              <p>
                Today, Floranza Fashion is one of Kerala’s most loved online fashion stores, with fresh styles being 
                added to our collections every single day!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
