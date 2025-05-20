'use client'
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { account_schema } from '@/shared/validations/account';
import { useAccountDetails, useEditAccount } from '@/services/queries/account';
import { toast } from 'sonner';

type Props = {

};


type FormValues = z.infer<typeof account_schema>;

export default function DetailsForm({ }: Props) {
const {mutateAsync:update,isPending} = useEditAccount()
const {data:user_data}=useAccountDetails()

	const form = useForm<FormValues>({
		resolver: zodResolver(account_schema),
		values: {
			firstName: user_data?.data?.name||"",
			lastName: "",
			displayName:user_data?.data?.username||"",
			email:user_data?.data?.email|| "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	function handleSubmit(values: FormValues) {
		const form_data = new FormData()
		form_data.append('fname',values.firstName)
		form_data.append('lname',values.lastName as string)
		form_data.append('username',values.displayName)
		form_data.append('email',values.email)
		form_data.append('password',values.newPassword as string)
		update(form_data,{
			onSuccess:()=>{
				toast.success('Account details updated')
			},
            onError:(error)=>{
               
                toast.error(error.data.message)
            }
		})
	}


	return (
		<div className="space-y-6   max-w-full mx-auto">
			<div>
				<h3 className="text-lg font-medium">Account Details</h3>
				<p className="text-sm text-gray-500">
					Update your personal information and account settings.
				</p>
			</div>

			<Separator />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input placeholder="John" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Input placeholder="Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="displayName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Display Name</FormLabel>
								<FormControl>
									<Input placeholder="johndoe" {...field} />
								</FormControl>
								<FormDescription>
									This is the name that will be displayed on your profile.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="john.doe@example.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Separator />

						<h3 className="text-lg font-medium">Change password</h3>



						<div className="space-y-4">
							<FormField
								control={form.control}
								name="newPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>New Password</FormLabel>
										<FormControl>
											<Input type="password" placeholder="••••••••" {...field} />
										</FormControl>
										<FormDescription>
											Password must be at least 8 characters.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input type="password" placeholder="••••••••" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>


					<div className="flex justify-end">
						<Button variant={'primary'} type="submit">{isPending ? 'Saving':'Save changes'}</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
