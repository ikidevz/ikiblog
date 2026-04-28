"use client";

import { editUserInfoSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { jetbrainsMono, roboto_mono } from "@/lib/font";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	InputGroupTextarea,
} from "@/components/ui/input-group";
import { AuthorData } from "@/lib/type";
import { handleEditAuthor } from "@/app/edit/actions";
import { toast } from "sonner";

type EditUserInfoValues = z.infer<typeof editUserInfoSchema>;

const EditProfile = ({ user }: { user: AuthorData }) => {
	const [isLoadingUserEdit, setIsLoadingUserEdit] = useState(false);

	const formUserEdit = useForm<EditUserInfoValues>({
		resolver: zodResolver(editUserInfoSchema),
		defaultValues: {
			first_name: user.first_name || "",
			last_name: user.last_name || "",
			username: user.username || "",
			email: user.email || "",
			bio: user.bio || "",
		},
	});

	async function onSubmitUserInfo(values: EditUserInfoValues) {
		setIsLoadingUserEdit(true);
		const result = await handleEditAuthor(values);

		if (result.error) {
			toast.error("Error !! ", { description: result.message });
		} else {
			toast.success("Profile Updated", {
				description: result?.message,
			});
		}

		setIsLoadingUserEdit(false);
	}

	return (
		<section className='flex flex-col gap-8'>
			<form
				onSubmit={formUserEdit.handleSubmit(onSubmitUserInfo)}
				className='flex flex-col gap-4'>
				<FieldGroup>
					{/* First Name & Last Name */}
					<div className='flex flex-row gap-4'>
						<Controller
							name='first_name'
							control={formUserEdit.control}
							render={({ field, fieldState }) => (
								<Field className='flex-1' data-invalid={fieldState.invalid}>
									<FieldLabel
										htmlFor='first_name'
										className={`startup-form_label ${jetbrainsMono.className}`}>
										First Name
									</FieldLabel>
									<Input
										{...field}
										id='first_name'
										placeholder='Enter First Name'
										aria-invalid={fieldState.invalid}
										className={`startup-form_input ${roboto_mono.className}`}
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name='last_name'
							control={formUserEdit.control}
							render={({ field, fieldState }) => (
								<Field className='flex-1' data-invalid={fieldState.invalid}>
									<FieldLabel
										htmlFor='last_name'
										className={`startup-form_label ${jetbrainsMono.className}`}>
										Last Name
									</FieldLabel>
									<Input
										{...field}
										id='last_name'
										placeholder='Enter Last Name'
										aria-invalid={fieldState.invalid}
										className={`startup-form_input ${roboto_mono.className}`}
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</div>

					{/* Username */}
					<Controller
						name='username'
						control={formUserEdit.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel
									htmlFor='username'
									className={`startup-form_label ${jetbrainsMono.className}`}>
									Username
								</FieldLabel>
								<Input
									{...field}
									id='username'
									placeholder='Enter Username'
									aria-invalid={fieldState.invalid}
									className={`startup-form_input ${roboto_mono.className}`}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					{/* Email */}
					<Controller
						name='email'
						control={formUserEdit.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel
									htmlFor='email'
									className={`startup-form_label ${jetbrainsMono.className}`}>
									Email
								</FieldLabel>
								<Input
									{...field}
									id='email'
									type='email'
									placeholder='Enter Email'
									aria-invalid={fieldState.invalid}
									className={`startup-form_input ${roboto_mono.className}`}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>

					{/* Bio */}
					<Controller
						name='bio'
						control={formUserEdit.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel
									htmlFor='bio'
									className={`startup-form_label ${jetbrainsMono.className}`}>
									Bio
								</FieldLabel>
								<InputGroup>
									<InputGroupTextarea
										{...field}
										id='bio'
										rows={5}
										placeholder='Profile Bio'
										aria-invalid={fieldState.invalid}
										className={`startup-form_textarea ${roboto_mono.className} resize-none`}
									/>
									<InputGroupAddon align='block-end'>
										<InputGroupText className='tabular-nums'>
											{field.value.length} characters
										</InputGroupText>
									</InputGroupAddon>
								</InputGroup>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</FieldGroup>

				<Button
					type='submit'
					className='mt-8 startup-form_btn text-white'
					disabled={isLoadingUserEdit}>
					{isLoadingUserEdit ? "Loading . . ." : "Edit"}
				</Button>
			</form>
		</section>
	);
};

export default EditProfile;
