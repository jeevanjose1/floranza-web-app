'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useResetPassword, useSigin } from "@/services/queries/auth"
import {  reset_password } from "@/shared/validations/auth"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


type LoginFormValues = z.infer<typeof reset_password>

export function ResetPassword({
	className,
	...props
}: React.ComponentProps<"div">) {
  const router =useRouter()
	const {mutateAsync:reset,isPending} = useResetPassword()
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(reset_password),
		defaultValues: {
			email: "",

		},
	})

	function onSubmit(data: LoginFormValues) {
		const form_data = new FormData()
		form_data.append('email',data.email)

		reset(form_data,{
			onSuccess:(response)=>{
        toast.success(response.message)
        router.push('/signin')
        form.reset()
			},
			onError:(error:any)=>{
				toast.error(error.data?.message)
			}
		})

	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">

				<div className="flex flex-col items-center gap-2">
					<h1 className="text-xl font-bold">Enter your email</h1>
					<div className="text-center text-sm">
						Return back to
						<Link href="/signin" className="underline underline-offset-4">
							Sign in
						</Link>
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem >
								<Label htmlFor="email">Email </Label>
								<FormControl>
									<Input
										{...field}
										id="email"
										type="text"
										placeholder="m@example.com"
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>


					<Button
						type="submit"
						variant="primary"
						className="w-full"
						disabled={isPending}
					>
						{isPending ? "Sending..." : "Send"}
					</Button>
				</div>
</form>
	</Form>

	<div className="text-muted-foreground text-center text-xs text-balance">
		By clicking continue, you agree to our{" "}
		<a href="#" className="underline underline-offset-4 hover:text-primary">
			Terms of Service
		</a>{" "}
		and{" "}
		<a href="#" className="underline underline-offset-4 hover:text-primary">
			Privacy Policy
		</a>.
	</div>
	</div>
	)
}
