import { getAuthorList, getPostList } from "@/lib/models/data";
import { PostsListData } from "@/lib/type";
import { createClient } from "@/utils/supabase/server";

export default async function FaSitemap() {
	const supabase = createClient();

	const { data: postData } = await getPostList(await supabase);
	const { data: authorData } = await getAuthorList(await supabase);

	const authorList =
		authorData?.map((author: any) => ({
			url: `https://ikiblog.vercel.app/author/@${author.username}`,
			lastModified: author?.created_at || new Date().toISOString(),
			changeFrequency: "monthly",
			priority: 1,
		})) ?? [];

	const postList =
		postData?.map((post: PostsListData) => ({
			url: `https://ikiblog.vercel.app/posts/${post.slug_title}`,
			lastModified: post?.created_at || new Date().toISOString(),
			changeFrequency: "monthly",
			priority: 1,
		})) ?? [];

	return [
		{
			url: "https://ikiblog.vercel.app",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		...postList,
		...authorList,
	];
}
