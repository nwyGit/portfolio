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

export function getBreadcrumbListSchema(
	items: Array<{ name: string; url: string }>
) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, idx) => ({
			"@type": "ListItem",
			position: idx + 1,
			name: item.name,
			item: item.url,
		})),
	};
}

export function getPersonSchema({
	name,
	url,
	image,
}: {
	name: string;
	url?: string;
	image?: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name,
		url,
		image,
	};
}

export function getOrganizationSchema({
	name,
	url,
	logo,
}: {
	name: string;
	url: string;
	logo?: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name,
		url,
		logo,
	};
}
