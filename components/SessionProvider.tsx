"use client";

import { pageWithAuth, pageWithoutAuth } from "@/lib/data";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import type { User } from "@supabase/supabase-js";

const SessionProvider = ({
	data,
	children,
}: {
	data: User | null;
	children: React.ReactNode;
}) => {
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		if (data && pageWithAuth.includes(pathname)) {
			router.push("/");
		}

		const isPageWithoutAuth = pageWithoutAuth.some((path) => {
			if (path === "/edit/posts") {
				return pathname.startsWith(path);
			}
			return pathname === path;
		});

		if (!data && isPageWithoutAuth) {
			router.push("/login");
		}
	}, [data, pathname, router]);

	return <>{children}</>;
};

export default SessionProvider;
