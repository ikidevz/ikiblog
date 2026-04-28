"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { loginFormSchema } from "@/lib/formSchema";
import { handleLogin } from "@/app/login/actions";
import { jetbrainsMono, roboto_mono } from "@/lib/font";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import {
	Field,
	FieldGroup,
	FieldLabel,
	FieldError,
} from "@/components/ui/field";

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof loginFormSchema>) {
		setIsLoading(true);

		const result = await handleLogin(values);

		if (result.error) {
			toast.error("Login Failed", {
				description: result.message,
			});
		} else {
			toast.success("Login Successful", {
				description: result.message,
			});
		}

		setIsLoading(false);
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='startup-form'>
			<FieldGroup>
				{/* EMAIL */}
				<Controller
					name='email'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel className={jetbrainsMono.className}>Email</FieldLabel>

							<Input
								{...field}
								placeholder='Enter email'
								className={roboto_mono.className}
								aria-invalid={fieldState.invalid}
							/>

							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

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
			</FieldGroup>

			<Button
				type='submit'
				className='startup-form_btn text-white'
				disabled={isLoading}>
				{isLoading ? "Loading . . ." : "Login"}
			</Button>
		</form>
	);
};

export default LoginForm;
