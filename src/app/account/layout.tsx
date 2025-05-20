
import CommonHeader from '@/components/common/common-header'
import Sidebar from '@/components/screen/account/common/sidebar'

import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}


export default async function Layout({ children }: Props) {
  return (
    <main className="min-h-screen font-lora">
      <CommonHeader title="My Account" />
      
      <div className="container py-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex gap-8 tablet-lg:flex-row flex-col">
            {/* Sidebar Navigation */}
           <Sidebar/>
            
            {/* Main Content */}
            <div className="laptop:col-span-3 flex-1">
              <div className="bg-white p-6 rounded-md border h-full">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}