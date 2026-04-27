import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // ← make sure you use ANON_KEY
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) => {
						// Update the request cookies so they are available in this request
						request.cookies.set(name, value);
						// Create a new response so we can set cookies on it
						response = NextResponse.next({ request });
						response.cookies.set(name, value, options);
					});
				},
			},
		},
	);

	// This is the most important line to prevent "Refresh Token Not Found"
	// It refreshes the session + sets fresh cookies when needed
	await supabase.auth.getUser(); // or getSession() / getClaims() depending on version

	return response;
}
