import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

import { convertToSlug } from "@/lib/string";
import { jetbrainsMono } from "@/lib/font";
import dayjs from "dayjs";

import TableContents from "@/components/TableContents";
import EditPostButton from "@/components/EditPostButton";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import LoadingBlogList from "@/components/LoadingBlogList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ifSignInUser } from "@/lib/models/data";

type Props = {
	params: Promise<{ title: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function fetchData(title: string) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/${title}`,
		{
			cache: "no-store",
		},
	);

	return await res.json();
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const title = (await params).title;
	const DataFetch = await fetchData(title);

	if (DataFetch.error || DataFetch.data == null) {
		console.error("Error fetching post data:", DataFetch.error);
		return {
			title: "Post Not Found",
			description: "The requested post could not be found.",
		};
	}

	return {
		title: `${DataFetch.data.title} | Iki's Project Blog`,
		description: DataFetch.data.description,
		authors: [
			{
				name: `${DataFetch.data.Author?.first_name} ${DataFetch.data.Author?.last_name}`,
				url: DataFetch.data.Author?.avatar_url ?? undefined,
			},
		],
		openGraph: {
			title: `${DataFetch.data.title} | Iki's Project Blog`,
			description: DataFetch.data.description,
			images: [DataFetch.data.image_link ?? "/default-og-image.jpg"],
		},
	};
}

const Posts = async ({ params }: Props) => {
	const { title } = await params;
	const DataFetch = await fetchData(title);

	const supabase = createClient();
	const { user } = await ifSignInUser(await supabase);

	if (DataFetch.data == null || DataFetch.error) {
		return notFound();
	}

	const dateOnly = dayjs(DataFetch.data?.created_at).format("MMMM DD, YYYY");
	const categoryGroup = DataFetch.data?.category.split(", ");
	const avatar_fallback = `${DataFetch.data?.Author?.first_name[0]}${DataFetch.data?.Author?.last_name[0]}`;

	return (
		<>
			<section className='post_header_container min-h-112.5 mb-8'>
				<p className='tag'>{dateOnly}</p>

				<h1 className='heading'>{DataFetch.data.title}</h1>
				<p className='sub-heading max-w-5xl!'>{DataFetch.data.description}</p>
			</section>

			<section className='section-container'>
				{DataFetch.data.image_link && (
					<Image
						src={DataFetch.data.image_link}
						width={1000}
						height={100}
						alt='thumbnail'
						className='w-full h-auto rounded-xl'
						loading='eager'
					/>
				)}

				<div className='flex items-center justify-between flex-col xl:flex-row gap-5 my-8'>
					<Link href={`/author/`} className='flex gap-2 items-center mb-3'>
						<Avatar className='w-17.5 h-17.5 flex items-center'>
							{DataFetch.data?.Author?.avatar_url === null ? (
								<AvatarFallback className='bg-primary text-white text-3xl'>
									{avatar_fallback}
								</AvatarFallback>
							) : (
								<AvatarImage
									src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${DataFetch.data?.Author?.avatar_url}`}
									alt={avatar_fallback}
									className='object-cover'
								/>
							)}
						</Avatar>

						<div className='ml-2'>
							<p className={`text-20-bold mb-1 ${jetbrainsMono.className}`}>
								{`${DataFetch.data?.Author?.first_name} ${DataFetch.data?.Author?.last_name}`}
							</p>
							<p
								className={`text-16-medium text-black-300! ${jetbrainsMono.className}`}>
								@{DataFetch.data?.Author?.username}
							</p>
						</div>
					</Link>

					<div className='flex flex-row gap-2'>
						{categoryGroup?.map((item: any, i: number) => (
							<p
								key={i}
								className={`category-tag ${
									jetbrainsMono.className
								} ${convertToSlug(item)}`}>
								{item}
							</p>
						))}
					</div>
				</div>

				<div className='relative flex flex-col xl:flex-row gap-8'>
					<MarkdownRenderer content={DataFetch.data.content} />
					<TableContents />
				</div>
				{user != null && <EditPostButton blog_id={DataFetch.data.id} />}
			</section>
		</>
	);
};

export default function PostPage({ params }: Props) {
	return (
		<Suspense fallback={<LoadingBlogList />}>
			<Posts params={params} />
		</Suspense>
	);
}
