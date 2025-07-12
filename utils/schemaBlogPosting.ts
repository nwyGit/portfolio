export interface BlogPostingSchemaProps {
	title: string;
	description: string;
	url: string;
	image?: string;
	datePublished: string;
	dateModified?: string;
	authorName: string;
}

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer,
			},
		})),
	};
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

export function getWebSiteSchema({
	name,
	url,
	description,
}: {
	name: string;
	url: string;
	description: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name,
		url,
		description,
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${url}/blogs?search={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
	};
}

export function getPortfolioSchema({
	title,
	description,
	url,
	image,
	author,
	dateCreated,
	technologies,
}: {
	title: string;
	description: string;
	url: string;
	image?: string;
	author: string;
	dateCreated: string;
	technologies?: string[];
}) {
	return {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		name: title,
		description,
		url,
		image,
		author: {
			"@type": "Person",
			name: author,
		},
		dateCreated,
		keywords: technologies?.join(", "),
		workExample: {
			"@type": "SoftwareApplication",
			name: title,
			description,
			url,
		},
	};
}

export function getPersonDetailedSchema({
	name,
	url,
	image,
	jobTitle,
	workLocation,
	knowsAbout,
	sameAs,
}: {
	name: string;
	url: string;
	image?: string;
	jobTitle: string;
	workLocation: string;
	knowsAbout: string[];
	sameAs?: string[];
}) {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name,
		url,
		image,
		jobTitle,
		workLocation,
		knowsAbout,
		sameAs,
	};
}
