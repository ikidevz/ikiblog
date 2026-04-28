import Link from "next/link";
import dayjs from "dayjs";
import { EyeIcon } from "lucide-react";
import { Button } from "./ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { jetbrainsMono, roboto_mono, space_mono } from "@/lib/font";
import { PostsListData } from "@/lib/type";
import { convertToSlug } from "@/lib/string";

const BlogItem = ({ info }: { info: PostsListData }) => {
	const dateOnly = dayjs(info.created_at).format("MMMM DD, YYYY");
	const avatar_fallback = `${info?.Author?.first_name[0]}${info?.Author?.last_name[0]}`;

	return (
		<li className='startup-card group'>
			<div className='flex-between'>
				<p className={`startup-card_date ${roboto_mono.className}`}>
					{dateOnly}
				</p>
				<div className='flex gap-1.5'>
					<EyeIcon className='size-6 text-primary' />
					<span
						className={`text-[16px] text-black font-bold ${roboto_mono.className}`}>
						{`${info?.VisitorLogCount || 0}`}
					</span>
				</div>
			</div>

			<div className='flex-between mt-5 gap-5'>
				<div className='flex-1'>
					<Link href={`/author/@${info?.Author?.username}`}>
						<p
							className={`text-16-medium line-clamp-1 ${jetbrainsMono.className}`}>
							@{info?.Author?.username}
						</p>
					</Link>
					<Link href={`/posts/${convertToSlug(info.title)}`}>
						<h3
							className={`text-26-semibold line-clamp-1  ${roboto_mono.className}`}>
							{info.title}
						</h3>
					</Link>
				</div>

				<Avatar className=' w-12 h-12 flex items-center'>
					{info?.Author?.avatar_url === null ? (
						<AvatarFallback className='bg-primary text-white text-2xl'>
							{avatar_fallback}
						</AvatarFallback>
					) : (
						<AvatarImage
							src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${info?.Author?.avatar_url}`}
							alt={avatar_fallback}
							className='object-cover'
						/>
					)}
				</Avatar>
			</div>

			<p className={`startup-card_desc ${roboto_mono.className}`}>
				{info.description}
			</p>

			<img
				src={info.image_link}
				alt='placeholder'
				className='startup-card_img'
			/>

			<div className='flex-between gap-3 mt-5'>
				<p className={`text-16-medium ${space_mono.className}`}>
					{info.category.split(", ")[0]}
				</p>
				<Button className={`startup-card_btn ${space_mono.className}`} asChild>
					<a href={`posts/${convertToSlug(info.title)}`}>
						<b>Details</b>
					</a>
				</Button>
			</div>
		</li>
	);
};

export default BlogItem;
