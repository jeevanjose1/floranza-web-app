'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { signup_schema } from "@/shared/validations/auth"
import { useSignup } from "@/services/queries/auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"



type SignupFormValues = z.infer<typeof signup_schema>

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const router = useRouter()
	const {mutateAsync:signup,isPending} = useSignup()
	const form = useForm<SignupFormValues>({
		resolver: zodResolver(signup_schema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	})

	function onSubmit(data: SignupFormValues) {
     const form_data = new FormData()
     form_data.append('username',data.username) 
	      form_data.append('email',data.email) 
     form_data.append('password',data.password) 

	 signup(form_data,{
		onSuccess:(response)=>{
		 toast.success(response.message)
		 form.reset()
         router.push('/signin')
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
						<h1 className="text-xl font-bold">Create Your Account</h1>
						<div className="text-center text-sm">
							Already have an account?{" "}
							<Link href="/signin" className="underline underline-offset-4">
								Sign in
							</Link>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem >
									<Label htmlFor="username">Username</Label>
									<FormControl>
										<Input
											{...field}
											id="username"
											type="text"
											placeholder="example12"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem >
									<Label htmlFor="email">Email</Label>
									<FormControl>
										<Input
											{...field}
											id="email"
											type="email"
											placeholder="Enter your email"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem >
									<Label htmlFor="password">Password</Label>
									<FormControl>
										<Input
											{...field}
											id="password"
											type="password"
											placeholder="Password"
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
							{isPending ? "Creating account..." : "Sign up"}
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
