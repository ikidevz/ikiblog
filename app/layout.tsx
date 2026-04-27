import type { Metadata } from "next";
import { workSans } from "@/lib/font";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

import { createClient } from "@/utils/supabase/server";
import { getUserWithAuthor } from "@/lib/models/data";

export const metadata: Metadata = {
	metadataBase: new URL("https://ikiblog.vercel.app"),
	keywords: ["iki blog", "iki project blog"],
	title: {
		default: "Iki's Project Blog",
		template: "%s | Iki's Project Blog",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const supabase = createClient();
	const { user, author } = await getUserWithAuthor(await supabase);
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${workSans.variable} antialiased`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='light'
					enableSystem
					disableTransitionOnChange>
					<SessionProvider data={user}>
						<Header user={user} author={author} />
						{children}
						<Footer />

						<Toaster />
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
