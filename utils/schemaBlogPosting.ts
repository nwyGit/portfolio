import { SITE_ORIGIN } from "@/components/v2/shared/type/constants";
import { BlogAuthor } from "@/components/v2/shared/type/types";

export const AUTHOR_JOB_TITLE_FALLBACK =
	"professional AI applied engineer (also a software engineer)";

export interface BlogPostingSchemaProps {
	title: string;
	description: string;
	url: string;
	image?: string;
	datePublished: string;
	dateModified?: string;
	inLanguage?: string;
	author?: BlogAuthor;
	authorName?: string;
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

function httpUrl(value?: string): string | undefined {
	const trimmed = value?.trim();
	if (!trimmed || !/^https?:\/\//i.test(trimmed)) return undefined;
	return trimmed;
}

export function authorSameAs(author?: Pick<BlogAuthor, "socialLinks">): string[] | undefined {
	const links = [
		author?.socialLinks?.github,
		author?.socialLinks?.linkedin,
		author?.socialLinks?.twitter,
	]
		.map((link) => httpUrl(link))
		.filter((link): link is string => Boolean(link));
	const unique = Array.from(new Set(links));
	return unique.length ? unique : undefined;
}

export function authorPageUrl(author?: Pick<BlogAuthor, "url" | "slug">): string | undefined {
	const explicit = httpUrl(author?.url);
	if (explicit) return explicit;
	if (author?.slug?.current === "raymond-ng") return `${SITE_ORIGIN}/about`;
	return undefined;
}

function authorEntity(author?: BlogAuthor, authorName?: string) {
	const name = author?.name || authorName;
	if (!name) return undefined;

	const sameAs = authorSameAs(author);
	const image = httpUrl(author?.image?.asset?.url);
	const description = author?.bio?.trim();
	const person: Record<string, unknown> = {
		"@type": "Person",
		name,
	};
	const url = authorPageUrl(author);
	if (url) person.url = url;
	person.jobTitle = author?.jobTitle?.trim() || AUTHOR_JOB_TITLE_FALLBACK;
	if (image) person.image = image;
	if (description) person.description = description;
	if (sameAs) person.sameAs = sameAs;
	return person;
}

export function getBlogPostingSchema({
	title,
	description,
	url,
	image,
	datePublished,
	dateModified,
	inLanguage,
	author,
	authorName,
}: BlogPostingSchemaProps) {
	const person = authorEntity(author, authorName);
	const schema: Record<string, unknown> = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: title,
		description,
		url,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": url,
		},
		datePublished,
		dateModified: dateModified || datePublished,
		author: person,
	};
	if (image) schema.image = [image];
	if (inLanguage) schema.inLanguage = inLanguage;
	return schema;
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
