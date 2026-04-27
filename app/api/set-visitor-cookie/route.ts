import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
	const visitorId = uuidv4();

	const response = NextResponse.json({ visitorId });
	response.cookies.set("visitor_id", visitorId, { maxAge: 60 * 60 * 24 * 365 });
	return response;
}
