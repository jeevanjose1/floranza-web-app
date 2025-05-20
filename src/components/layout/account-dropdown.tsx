

import {
	BaggageClaim,
	BellIcon,
	CreditCardIcon,
	Heart,
	LayoutDashboard,
	LogOutIcon,
	MapPinCheck,
	UserCircleIcon,
	UserCog,
	UserRound,
} from "lucide-react"

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ReactNode } from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { deleteCookie } from "cookies-next/client"
import Link from "next/link"
import { useAccountDetails } from "@/services/queries/account"

type Prop = {
	user: {
		name: string
		email: string
		avatar: string
	}
}
export function AccountDropdown({
	user,
}: Prop) {

	    const {data:user_data}=useAccountDetails()

	const router = useRouter()
	const handleLogout = ()=>{
		deleteCookie('floranza-t-value')
		router.refresh()
	}
	return (

		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
		className={`rounded-full [&_svg:not([class*='size-'])]:size-5 `}
		variant="ghost"
		size="icon"
	>
		<UserRound strokeWidth={2} />
	</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent
			className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
			side={'bottom'}
			align="end"
			sideOffset={4}
		>
			<DropdownMenuLabel className="p-0 font-normal">
				<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
					<Avatar className="h-8 w-8 rounded-lg">
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback className="rounded-lg">{user_data?.data?.name?.split('')?.[0]}</AvatarFallback>
					</Avatar>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium">{user_data?.data?.name}</span>
						<span className="truncate text-xs text-muted-foreground">
							{user_data?.data?.email}
						</span>
					</div>
				</div>
			</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<Link href={'/account/dashboard'}>
				<DropdownMenuItem>
					<LayoutDashboard />
						Dashboard
				</DropdownMenuItem>
				</Link>
				<Link href={'/account/orders'}>
				<DropdownMenuItem>
					<BaggageClaim />
					Orders
				</DropdownMenuItem>
				</Link>
					<Link href={'/account/addresses'}>

					<DropdownMenuItem>
						<MapPinCheck />
						Addresses
				</DropdownMenuItem>
					</Link>
						<Link href={'/account/details'}>

					<DropdownMenuItem>
					<UserCog />

						Account Details
				</DropdownMenuItem>
				</Link>
					<Link href={'/account/wishlist'}>

					<DropdownMenuItem>
						<Heart /> Whishlist

					</DropdownMenuItem>
						</Link>

	</DropdownMenuGroup>
	<DropdownMenuSeparator />
	<DropdownMenuItem onClick={handleLogout}>
		<LogOutIcon />
		Log out
	</DropdownMenuItem>
	</DropdownMenuContent>
	</DropdownMenu>

	)
}
