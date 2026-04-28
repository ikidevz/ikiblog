import { Metadata, ResolvingMetadata } from "next";
import { createClient } from "@/utils/supabase/server";

import { notFound } from "next/navigation";
import { getAuthorPostList } from "@/lib/models/data";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostsListData } from "@/lib/type";
import { Key } from "react";

import BlogItem from "@/components/BlogItem";

type Props = {
	params: Promise<{ username: string }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	const supabase = createClient();

	const { data } = await getAuthorPostList(
		(await params).username.replace("@", ""),
		await supabase,
	);

	return {
		title: `@${data?.username} | Iki's Project Blog`,
		description: data?.bio,
		openGraph: {
			title: `@${data?.username} | Iki's Project Blog`,
			description: data?.bio,
			images: [data?.avatar_url ?? "/default-og-image.jpg"],
		},
	};
}

const Author = async ({ params, searchParams }: Props) => {
	const { username } = await params;
	const supabase = createClient();

	const { data: authorData, error: errorAuthorData } = await getAuthorPostList(
		username.replace("%40", ""),
		await supabase,
	);

	if (!authorData || errorAuthorData || !username.includes("%40")) {
		return notFound();
	}

	const { data: postData } = await (await supabase)
		.from("Posts")
		.select(`*,Author(id,username,first_name,last_name)`)
		.eq("author_id", authorData.id);

	const avatar_fallback = `${authorData.first_name[0]}${authorData.last_name[0]}`;
	return (
		<section className='profile_container'>
			<div className='profile_card'>
				<div className='profile_title'>
					<h3 className='text-24-black uppercase text-center line-clamp-1'>
						{authorData.first_name} {authorData.last_name}
					</h3>
				</div>

				<Avatar className='w-50 h-50 flex items-center'>
					{authorData.avatar_url === null ? (
						<AvatarFallback className='bg-primary text-white text-5xl'>
							{avatar_fallback}
						</AvatarFallback>
					) : (
						<AvatarImage
							src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${authorData.avatar_url}`}
							alt={avatar_fallback}
							className='object-cover'
						/>
					)}
				</Avatar>

				<p className='text-30-extrabold mt-7 text-center'>
					@{authorData.username}
				</p>
				<p className='mt-1 tag text-center'> {authorData.bio}</p>
			</div>

			<div className='flex-1 flex flex-col gap-5 lg:-mt-5 min-h-175'>
				<p className='text-30-bold'>All Blog</p>
				<ul className='card_grid-sm'>
					{postData == null ? (
						<p>Loading . . .</p>
					) : (
						postData.map((data: PostsListData, i: Key | null | undefined) => (
							<BlogItem info={data} key={i} />
						))
					)}
				</ul>
			</div>
		</section>
	);
};

export default Author;
