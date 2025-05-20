
'use client'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAccountDetails } from '@/services/queries/account'
import { HeartIcon, HomeIcon, LogOutIcon, MapPinCheck, ShoppingCartIcon, UserCog, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

type Props = {}
type MenuItemProps = {
  icon: ReactNode
  label: string
  href: string
  active?: boolean
}

const MenuItem = ({ icon, label, href, active = false }: MenuItemProps) => {
  return (
    <Link href={href}>
      <div className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors ${
        active 
          ? 'bg-muted text-primary font-medium' 
          : 'hover:bg-muted '
      }`}>
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  )
}

export default function Sidebar({}: Props) {
      const pathname = usePathname()
    const {data:user_data}=useAccountDetails()

  return (
    <div className="laptop:flex-[.4]">
              <div className="bg-white p-4 rounded-md border">
                <div className="flex items-center space-x-4 ">
                  <div className="h-10 w-10 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                    <UserIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{user_data?.data?.name}</p>
                    <p className="text-sm text-gray-500">{user_data?.data?.email}</p>
                  </div>
                </div>
                
                <Separator className="my-3" />
                
                <nav className="space-y-1 mt-4">
                  <MenuItem 
                    icon={<HomeIcon className="h-5 w-5" />} 
                    label="Dashboard" 
                    href="/account/dashboard" 
                    active ={pathname.includes('/dashboard')}
                  />
                   <MenuItem 
                    icon={<ShoppingCartIcon className="h-5 w-5" />} 
                    label="Orders" 
                    href="/account/orders" 
                                        active ={pathname.includes('/orders')}

                  />
                  <MenuItem 
                    icon={<MapPinCheck className="h-5 w-5" />} 
                    label="Addresses" 
                    href="/account/addresses" 
                                                            active ={pathname.includes('/addresses')}

                  />
                  <MenuItem 
                    icon={<UserCog className="h-5 w-5" />} 
                    label="Account Details" 
                    href="/account/details" 
                                                                                active ={pathname.includes('/details')}

                  />
                  <MenuItem 
                    icon={<HeartIcon className="h-5 w-5" />} 
                    label="Wishlist" 
                    href="/account/wishlist" 
                                                                                active ={pathname.includes('/wishlist')}

                  />
                  
                  
                </nav>
                
                <Separator className="my-3" />
                
                <div className="mt-4 px-4">
                  <Button variant={'transparant'} className="flex items-center has-[>svg]:px-0 gap-3 text-sm text-gray-700 hover:text-red-600 transition-colors">
                    <LogOutIcon className="h-5 w-5 " />
                    <span>Sign Out</span>
                  </Button>
                </div>
              </div>
            </div>
  )
}