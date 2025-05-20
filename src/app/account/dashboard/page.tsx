'use client'; // Add this at the top to mark it as a Client Component

import { images } from '@/shared/images/images'
import { deleteCookie } from 'cookies-next/server'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

type Props = {}
type CardProp = {
    icon: string,
    title: string,
    link?: string,
    onClick?: () => void
}

const MenuCard = ({ icon, title, link, onClick }: CardProp) => {
    if (onClick) {
        return (
            <div onClick={onClick} className='w-full px-3 py-6 cursor-pointer hover:bg-muted transition-all border rounded-md shadow flex items-center justify-center flex-col'>
                <Image src={icon} width={60} height={60} alt={title} className='mb-2' />
                <p>{title}</p>
            </div>
        )
    }

    return (
        <Link href={link || '#'} className='w-full px-3 py-6 cursor-pointer hover:bg-muted transition-all border rounded-md shadow flex items-center justify-center flex-col'>
            <Image src={icon} width={60} height={60} alt={title} className='mb-2' />
            <p>{title}</p>
        </Link>
    )
}

export default function AccountPage({}: Props) {
    // const handleLogout = () => {
    //     deleteCookie('floranza-t-value')
    //     window.location.reload()
    // }

    const data = [
        {
            icon: images.orders,
            title: 'Orders',
            link: '/account/orders'
        },
        {
            icon: images.address,
            title: 'Addresses',
            link: '/account/addresses'
        },
        {
            icon: images.account,
            title: 'Account Details',
            link: '/account/details'
        },
        {
            icon: images.whishlist,
            title: 'Wish List',
            link: '/account/wishlist'
        },
    ]

    return (
        <div>
            <p className='font-medium text-muted-foreground/80 max-w-200 mb-8'>
                From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
            </p>
            <div className='grid mobile-lg:grid-cols-2 tablet:grid-cols-3 gap-4'>
                {data.map(item => (
                    <MenuCard key={item.title} icon={item.icon} title={item.title} link={item.link} />
                ))}
                {/* <MenuCard 
                    icon={images.logout} 
                    title="Logout" 
                    // onClick={handleLogout} 
                /> */}
            </div>
        </div>
    )
}