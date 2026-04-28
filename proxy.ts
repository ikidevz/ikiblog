import type { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/proxy";
import { v4 as uuidv4 } from "uuid";

export async function proxy(request: NextRequest) {
	const response = await updateSession(request);

	// Set visitor cookie if not present, only on blog routes
	if (request.nextUrl.pathname.startsWith("/blog/")) {
		if (!request.cookies.get("visitor_id")) {
			response.cookies.set("visitor_id", uuidv4(), {
				maxAge: 60 * 60 * 24 * 365,
				httpOnly: true,
				sameSite: "lax",
			});
		}
	}

	return response;
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
