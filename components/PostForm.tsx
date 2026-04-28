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
import { handleCreatePostBlog } from "@/app/posts/actions";
import { convertToSlug } from "@/lib/string";
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

const PostForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			category: "",
			secondary_category: null,
			imgLink: "",
			content: "",
		},
	});

	const selectedCategory = form.watch("category");

	async function onSubmit(values: FormValues) {
		setIsLoading(true);
		const result = await handleCreatePostBlog(values);

		if (result?.error) {
			toast.error("Error on Post Submit", {
				description: result.message,
			});
		} else {
			toast.success("Post Created Successfully", {
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
								htmlFor='post-title'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Title
							</FieldLabel>
							<Input
								{...field}
								id='post-title'
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
								htmlFor='post-description'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Description
							</FieldLabel>
							<InputGroup className='border-0 focus:outline-none focus:ring-0'>
								<InputGroupTextarea
									{...field}
									id='post-description'
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
								htmlFor='post-category'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Category
							</FieldLabel>
							<MultipleSelector
								id='post-category'
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
								badgeClassName='p-4 text-white gap-1'
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
									defaultValue='business-analysis'
									onValueChange={field.onChange}>
									<div className='grid grid-cols-2 gap-4 mt-4'>
										{secondaryCategoryOptions.map((option) => (
											<div
												key={option.value}
												className='flex items-center space-x-2'>
												<RadioGroupItem
													value={option.value}
													id={option.value}
												/>
												<Label
													htmlFor={option.value}
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
								htmlFor='post-img-link'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Image URL
							</FieldLabel>
							<Input
								{...field}
								id='post-img-link'
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
								htmlFor='post-content'
								className={`startup-form_label ${jetbrainsMono.className}`}>
								Content
							</FieldLabel>
							<div data-color-mode='light'>
								<MDEditor
									{...field}
									id='post-content'
									preview='live'
									height={300}
									className='overflow-hidden border-r-full border-[3px] border-black max-w-none prose prose-headings:mt-8 prose-headings:font-bold prose-headings:text-black prose-h1:text-[35px] prose-h2:text-[32px] prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-p:text-[1.25rem] prose-code:text-[#111827] prose-li:text-[1.25rem] prose-pre:bg-white-100 dark:prose-headings:text-white'
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

export default PostForm;
