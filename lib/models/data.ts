import { SupabaseClient, User, PostgrestError } from "@supabase/supabase-js";
import { AuthorData, PostsListData, QuestionsData } from "../type";

/**
 * 🔐 Get current user
 */
export const ifSignInUser = async (
	supabase: SupabaseClient,
): Promise<{ user: User | null }> => {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return { user };
};

export const getUserWithAuthor = async (
	supabase: SupabaseClient,
): Promise<{
	user: User | null;
	author: AuthorData | null;
	error: PostgrestError | null;
}> => {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return { user: null, author: null, error: null };
	}

	const { data: author, error } = await supabase
		.from("Author")
		.select("*")
		.eq("auth_id", user.id)
		.maybeSingle(); // ✅ safe

	if (error) {
		console.error("Error fetching author:", error.message);
	}

	return { user, author, error };
};

/**
 * 📝 Get single post (FIXED: no double query)
 */
export const getPostData = async (
	slug: string,
	supabase: SupabaseClient,
): Promise<{ data: PostsListData | null; error: PostgrestError | null }> => {
	const { data, error } = await supabase
		.from("Posts")
		.select(
			`
      *,
      Author(id, username, first_name, last_name, avatar_url)
    `,
		)
		.eq("slug_title", slug)
		.maybeSingle(); // ✅ safer

	return { data, error };
};

/**
 * 👀 Log visitor
 */
export const logVisitor = async (
	visitorId: string,
	postId: string,
	supabase: SupabaseClient,
): Promise<{ error: PostgrestError | null }> => {
	const { error } = await supabase.from("VisitorLogs").insert({
		visitor_id: visitorId,
		post_id: postId,
	});

	if (error) {
		console.error("Error logging visitor:", error.message);
	}

	return { error };
};

/**
 * 📚 Get all posts
 */
export const getPostList = async (
	supabase: SupabaseClient,
): Promise<{ data: PostsListData[] | null; error: PostgrestError | null }> => {
	const { data, error } = await supabase
		.from("Posts")
		.select(
			`
      *,
      Author(id, username, first_name, last_name, avatar_url),
      VisitorLogs(count)
    `,
		)
		.order("created_at", { ascending: false });

	const processedData =
		data?.map((post) => ({
			...post,
			visitorCount: post.VisitorLogs?.[0]?.count ?? 0,
		})) ?? null;

	return { data: processedData, error };
};

/**
 * 👤 Get all authors
 */
export const getAuthorList = async (
	supabase: SupabaseClient,
): Promise<{ data: AuthorData[] | null; error: PostgrestError | null }> => {
	const { data, error } = await supabase.from("Author").select();

	return { data, error };
};

/**
 * 👤 Get author by username
 */
export const getAuthorPostList = async (
	username: string,
	supabase: SupabaseClient,
): Promise<{ data: AuthorData | null; error: PostgrestError | null }> => {
	const { data, error } = await supabase
		.from("Author")
		.select()
		.eq("username", username)
		.maybeSingle(); // ✅ safer

	return { data, error };
};

/**
 * ❓ Get random questions
 */
export const getQuestionList = async (
	supabase: SupabaseClient,
	category: string,
	questionNum: number,
): Promise<{ data: QuestionsData[] | null; error: PostgrestError | null }> => {
	const { data, error } = await supabase.rpc("get_random_questions", {
		category_param: category,
		limit_param: questionNum,
	});

	if (error) {
		console.error("Error fetching questions:", error.message);
		return { data: null, error };
	}

	return { data, error: null };
};
