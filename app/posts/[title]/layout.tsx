import { getPostData, ifSignInUser, logVisitor } from "@/lib/models/data";
import { createClient } from "@/utils/supabase/server";

export default async function PostLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ title: string }>;
}) {
	const { title } = await params;
	const supabase = createClient();

	const { user } = await ifSignInUser(await supabase);

	let visitorId: string;
	if (!user) {
		const existingVisitorId = (await cookieStore.get("visitor_id"))?.value;

		if (!existingVisitorId) {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SITE_URL}/api/set-visitor-cookie`,
			);
			const { visitorId: newVisitorId } = await response.json();
			visitorId = newVisitorId;
		} else {
			visitorId = existingVisitorId;
		}
	} else {
		visitorId = "";
	}

	if (title) {
		const { data: postData, error } = await getPostData(title, await supabase);

		if (visitorId && postData) {
			await logVisitor(visitorId, postData.id, await supabase);
		}
	}

	return <main>{children}</main>;
}
