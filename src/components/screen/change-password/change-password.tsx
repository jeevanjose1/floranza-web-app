'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useChangePassword, useVarifyToken } from "@/services/queries/auth"
import { change_password } from "@/shared/validations/auth"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { TicketX } from "lucide-react"
import Loader from "@/components/common/loader"


type LoginFormValues = z.infer<typeof change_password>

export function ChangePassword({
	className,
	...props
}: React.ComponentProps<"div">) {
	const router = useRouter()
	const params = useParams()
	const { mutateAsync: change, isPending } = useChangePassword()
	const { mutateAsync: varify, error, isPending: varify_pending } = useVarifyToken()
	useEffect(() => {
		if (params.token) {
			varify(params?.token)

		} else {
			router.push('/')
		}
	}, [])

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(change_password),
		defaultValues: {
			confirm_password: "",
			password: "",
		},
	})

	function onSubmit(data: LoginFormValues) {
		const form_data = new FormData()
		form_data.append('c_password', data.confirm_password)
		form_data.append('password', data.password)

		change({ data: form_data, token: params?.token }, {
			onSuccess: (response) => {
				toast.success(response?.message)
				form.reset()
				router.push('/signin')
			},
			onError: (error: any) => {
				toast.error(error.data?.message)
			}
		})

	}

	if (varify_pending) {
		return <div className="flex items-center justify-center flex-col gap-4 max-w-64 w-full h-64 p-6 border border-muted rounded-lg ">
			<Loader />
		</div>
	}

	if (error) {
		return (
			<div className="flex items-center justify-center flex-col gap-4 h-64 p-6 border border-muted rounded-lg ">
				<div className="flex items-center justify-center bg-red-100 rounded-full p-3">
					<TicketX className="h-8 w-8 text-red-500" />
				</div>
				<h2 className="text-xl font-semibold text-gray-800">Error</h2>
				<p className="text-gray-600 text-center">Session timeout or invalid token</p>
				<Button
					onClick={() => router.push('/signin')}
					className="mt-2"
					size={'sm'}
					variant={'primary'}
				>
					Return to Login
				</Button>
			</div>
		)
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
					<div className="flex flex-col items-center gap-2">
						<h1 className="text-xl font-bold">Change your password</h1>

					</div>

					<div className="flex flex-col gap-4">


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


						<FormField
							control={form.control}
							name="confirm_password"

							render={({ field }) => (
								<FormItem >
									<Label htmlFor="confirm_password">Confirm Password</Label>
									<FormControl>
										<Input
											{...field}
											id="confirm_password"
											type="password"
											placeholder="Confirm password"
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
							{isPending ? "Changing..." : "Change"}
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
