
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function SignupForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<form>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col items-center gap-2">
						
						<h1 className="text-xl font-bold">Create Your Account </h1>
						<div className="text-center text-sm">
							Already have an account?{" "}
							<Link href="/signin" className="underline underline-offset-4">
								Sign in
							</Link>
						</div>
					</div>
					<div className="flex flex-col gap-4">
							<div className="grid gap-3">
							<Label htmlFor="email">Username</Label>
							<Input
								id="username"
								type="text"
								placeholder="example12"

							/>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"

							/>
						</div>
							<div className="grid gap-3">
								<Label htmlFor="email">Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="Password"

								/>
						</div>
						<Button type="submit" variant={'primary'} className="w-full">
							Signup
						</Button>
					</div>
					
				</div>
			</form>
			<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
				and <a href="#">Privacy Policy</a>.
			</div>
		</div>
	)
}
