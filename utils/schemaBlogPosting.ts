export interface BlogPostingSchemaProps {
	title: string;
	description: string;
	url: string;
	image?: string;
	datePublished: string;
	dateModified?: string;
	authorName: string;
}

export function getBlogPostingSchema({
	title,
	description,
	url,
	image,
	datePublished,
	dateModified,
	authorName,
}: BlogPostingSchemaProps) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: title,
		description,
		url,
		image: image ? [image] : undefined,
		datePublished,
		dateModified: dateModified || datePublished,
		author: {
			"@type": "Person",
			name: authorName,
		},
	};
}
