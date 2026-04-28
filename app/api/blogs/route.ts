import { getPostList } from "@/lib/models/data";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
	const supabase = createClient();
	const { data, error } = await getPostList(await supabase);

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}

	return NextResponse.json({ data });
}
