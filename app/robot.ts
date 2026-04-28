import { MetadataRoute } from "next";

export default function robot(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: "/login",
		},
		sitemap: "https://ikiblog.vercel.app/sitemap.xml",
	};
}
