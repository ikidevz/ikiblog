export const convertToSlug = (text: string): string => {
	return text
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w\-]+/g, "")
		.replace(/\-\-+/g, "-")
		.trim();
};

export const convertToTitle = (slug: string): string => {
	if (!slug) return "";
	return slug
		.replace(/-/g, " ")
		.replace(/\b\w/g, (char) => char.toUpperCase())
		.trim();
};
