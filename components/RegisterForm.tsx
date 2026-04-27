"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

import { registerFormSchema } from "@/lib/formSchema";
import { handleRegister } from "@/app/register/actions";
import { jetbrainsMono, roboto_mono } from "@/lib/font";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import {
	Field,
	FieldGroup,
	FieldLabel,
	FieldError,
} from "@/components/ui/field";

const RegisterForm = () => {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			username: "",
			email: "",
			first_name: "",
			last_name: "",
			password: "",
			confirm_password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof registerFormSchema>) {
		setIsLoading(true);

		const result = await handleRegister(values);

		if (result?.error) {
			toast("Register Failed", {
				description: result.message,
			});
		} else {
			toast("Register Successful", {
				description: "Welcome!",
			});

			router.push("/login");
		}

		setIsLoading(false);
	}

	// reusable input renderer (keeps code clean)
	const renderField = (
		name: keyof z.infer<typeof registerFormSchema>,
		label: string,
		placeholder: string,
	) => (
		<Controller
			name={name}
			control={form.control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel className={jetbrainsMono.className}>{label}</FieldLabel>

					<Input
						{...field}
						placeholder={placeholder}
						className={roboto_mono.className}
						aria-invalid={fieldState.invalid}
					/>

					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='startup-form'>
			<FieldGroup>
				{renderField("email", "Email", "Enter email")}
				{renderField("username", "Username", "Enter username")}
				{renderField("first_name", "First Name", "Enter first name")}
				{renderField("last_name", "Last Name", "Enter last name")}

				{/* PASSWORD */}
				<Controller
					name='password'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel className={jetbrainsMono.className}>
								Password
							</FieldLabel>

							<div className='relative'>
								<Input
									{...field}
									type={showPassword ? "text" : "password"}
									placeholder='Enter password'
									className={roboto_mono.className}
									aria-invalid={fieldState.invalid}
								/>

								<Button
									type='button'
									variant='ghost'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute right-0.5 top-0 h-full px-4 hover:bg-transparent'
									aria-label={showPassword ? "Hide password" : "Show password"}>
									{showPassword ? (
										<FaRegEyeSlash size={22} />
									) : (
										<FaRegEye size={22} />
									)}
								</Button>
							</div>

							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				{/* CONFIRM PASSWORD */}
				<Controller
					name='confirm_password'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel className={jetbrainsMono.className}>
								Confirm Password
							</FieldLabel>

							<div className='relative'>
								<Input
									{...field}
									type={showConfirmPassword ? "text" : "password"}
									placeholder='Confirm password'
									className={roboto_mono.className}
									aria-invalid={fieldState.invalid}
								/>

								<Button
									type='button'
									variant='ghost'
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className='absolute right-0.5 top-0 h-full px-4 hover:bg-transparent'
									aria-label={
										showConfirmPassword ? "Hide password" : "Show password"
									}>
									{showConfirmPassword ? (
										<FaRegEyeSlash size={22} />
									) : (
										<FaRegEye size={22} />
									)}
								</Button>
							</div>

							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>

			<Button
				type='submit'
				className='startup-form_btn text-white'
				disabled={isLoading}>
				{isLoading ? "Loading . . ." : "Register"}
			</Button>
		</form>
	);
};

export default RegisterForm;
