// app/blog/[title]/layout.tsx  (or wherever your PostLayout is)
import { getPostData, ifSignInUser, logVisitor } from "@/lib/models/data";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function PostLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ title: string }>;
}) {
	const { title } = await params;
	const supabase = createClient();
	const cookieStore = await cookies();

	const { user } = await ifSignInUser(await supabase);
	const visitorId = !user
		? (cookieStore.get("visitor_id")?.value ?? null)
		: null;

	if (title && visitorId) {
		try {
			const { data: postData } = await getPostData(title, await supabase);
			if (postData?.id) {
				await logVisitor(visitorId, postData.id, await supabase);
			}
		} catch (err) {
			console.error("Failed to log visitor:", err);
		}
	}

	return <main>{children}</main>;
}
