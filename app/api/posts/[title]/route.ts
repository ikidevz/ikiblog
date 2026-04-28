import { createClient } from "@/utils/supabase/server";
import { getPostData } from "@/lib/models/data";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ title: string }> },
) {
	const title = (await params).title;
	const supabase = createClient();

	const { data, error } = await getPostData(title, await supabase);

	if (error) {
		return NextResponse.json(
			{ error: error.message, data: null },
			{ status: 500 },
		);
	}

	return NextResponse.json({ data });
}
