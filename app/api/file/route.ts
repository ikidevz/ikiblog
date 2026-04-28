import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const file = formData.get("file") as File | null;

		if (!file) {
			return NextResponse.json(
				{ error: "No file provided in the request." },
				{ status: 400 },
			);
		}

		const backendResponse = await fetch(
			`${process.env.NEXT_PUBLIC_PROJECT_BACKEND_API}/data-visualization/csv_file`,
			{
				method: "POST",
				body: formData,
			},
		);

		const data = await backendResponse.json();
		return NextResponse.json(data, { status: backendResponse.status });
	} catch (error) {
		console.error("API Error:", error);
		return NextResponse.json(
			{ error: "Error processing the file or connecting to the external API." },
			{ status: 500 },
		);
	}
}
