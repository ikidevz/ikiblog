"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import katex from "katex";
import { getCodeString } from "rehype-rewrite";
import { Send } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { formSchema } from "@/lib/formSchema";
import { categoryOptions, secondaryCategoryOptions } from "@/lib/data";
import { jetbrainsMono, roboto_mono } from "@/lib/font";
import { handleEditPost } from "@/app/posts/actions";
import { convertToSlug } from "@/lib/string";
import { PostsListData } from "@/lib/type";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import MultipleSelector from "@/components/ui/multiple-selector";

type FormValues = z.infer<typeof formSchema>;

const PostEdit = ({ post }: { post: PostsListData }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: post?.title || "",
			description: post?.description || "",
			category: post?.category || "",
			secondary_category: post?.secondary_category || null,
			imgLink: post?.image_link || "",
			content: post?.content || "",
		},
	});

	const selectedCategory = form.watch("category");

	async function onSubmit(values: FormValues) {
		setIsLoading(true);
		const result = await handleEditPost(post.id, values);

		if (result?.error) {
			toast.error("Failed to edit post. Please try again.", {
				description: result.message,
			});
		} else {
			toast.success("Redirecting to the post page...", {
				description: result?.message,
			});
			router.push(`/posts/${convertToSlug(result?.data.title)}`);
		}

		setIsLoading(false);
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className='startup-form'>
			<FieldGroup>
				{/* Title */}
				<Controller
					name='title'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel
								htmlFor='edit-title'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Title
							</FieldLabel>
							<Input
								{...field}
								id='edit-title'
								placeholder='Project Blog'
								aria-invalid={fieldState.invalid}
								className={`startup-form_input ${roboto_mono.className}`}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				{/* Description */}
				<Controller
					name='description'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel
								htmlFor='edit-description'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Description
							</FieldLabel>
							<InputGroup>
								<InputGroupTextarea
									{...field}
									id='edit-description'
									rows={5}
									placeholder='Project Blog Description'
									aria-invalid={fieldState.invalid}
									className={`startup-form_textarea ${roboto_mono.className} resize-none`}
								/>
								<InputGroupAddon align='block-end'>
									<InputGroupText className='tabular-nums'>
										{field.value.length} characters
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				{/* Category */}
				<Controller
					name='category'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel
								htmlFor='edit-category'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Category
							</FieldLabel>
							<MultipleSelector
								id='edit-category'
								value={
									field.value
										? field.value
												.split(", ")
												.map((val) => ({ label: val, value: val }))
										: []
								}
								onChange={(selectedOptions) =>
									field.onChange(
										selectedOptions.map((opt) => opt.value).join(", "),
									)
								}
								className={`startup-form_select ${roboto_mono.className}`}
								badgeClassName='py-2 text-white gap-1'
								defaultOptions={categoryOptions}
								placeholder='Select Category you like...'
								emptyIndicator={
									<p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>
										no results found.
									</p>
								}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				{/* Secondary Category (Stratascratch only) */}
				{selectedCategory.includes("stratascratch") && (
					<Controller
						name='secondary_category'
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel
									className={`startup-form_label ${jetbrainsMono.className}`}>
									Stratascratch Category
								</FieldLabel>
								<RadioGroup
									defaultValue={post?.secondary_category || "business-analysis"}
									onValueChange={field.onChange}>
									<div className='grid grid-cols-2 gap-4 mt-4'>
										{secondaryCategoryOptions.map((option) => (
											<div
												key={option.value}
												className='flex items-center space-x-2'>
												<RadioGroupItem
													value={option.value}
													id={`edit-${option.value}`}
												/>
												<Label
													htmlFor={`edit-${option.value}`}
													className={jetbrainsMono.className}>
													{option.label}
												</Label>
											</div>
										))}
									</div>
								</RadioGroup>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				)}

				{/* Image URL */}
				<Controller
					name='imgLink'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel
								htmlFor='edit-img-link'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Image URL
							</FieldLabel>
							<Input
								{...field}
								id='edit-img-link'
								placeholder='Paste a link to your Blog'
								aria-invalid={fieldState.invalid}
								className={`startup-form_input ${roboto_mono.className}`}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				{/* Content (MDEditor) */}
				<Controller
					name='content'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel
								htmlFor='edit-content'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Content
							</FieldLabel>
							<div data-color-mode='light'>
								<MDEditor
									{...field}
									id='edit-content'
									preview='live'
									height={300}
									className='overflow-hidden max-w-none'
									textareaProps={{
										placeholder: "Share your idea here . . .",
									}}
									previewOptions={{
										rehypePlugins: [[rehypeSanitize]],
										components: {
											code: ({ children = [], className, ...props }) => {
												if (
													typeof children === "string" &&
													/\$\$(.*)\$\$/.test(children)
												) {
													const html = katex.renderToString(
														children.replace(/\$\$(.*)\$\$/, "$1"),
														{ throwOnError: false },
													);
													return (
														<code
															dangerouslySetInnerHTML={{ __html: html }}
															style={{ background: "transparent" }}
														/>
													);
												}
												const code =
													props.node && props.node.children
														? getCodeString(props.node.children)
														: children;
												if (
													typeof code === "string" &&
													typeof className === "string" &&
													/language-katex/.test(className.toLocaleLowerCase())
												) {
													const html = katex.renderToString(code, {
														throwOnError: false,
													});
													return (
														<code
															style={{ fontSize: "150%" }}
															dangerouslySetInnerHTML={{ __html: html }}
														/>
													);
												}
												return (
													<code className={String(className)}>{children}</code>
												);
											},
										},
									}}
								/>
							</div>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>

			{/* Submit */}
			<Button
				type='submit'
				className='startup-form_btn text-white'
				disabled={isLoading}>
				<Send className='size-6! mr-2' />
				Submit
			</Button>
		</form>
	);
};

export default PostEdit;
