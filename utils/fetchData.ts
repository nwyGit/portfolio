import { groq } from "next-sanity";
import { sanityClient } from "@/utils/sanity";
import { 
	Hero, 
	About, 
	Skill, 
	Project, 
	BlogPost, 
	BlogCategory, 
	BlogTag, 
	BlogFAQ, 
	Language 
} from "@/components/v2/shared/type/types";

const dataFetcher = async <T>(query: string, defaultValue?: T): Promise<T> => {
	try {
		const data = await sanityClient.fetch<T>(query);
		if (!data && defaultValue !== undefined) {
			return defaultValue;
		}
		return data;
	} catch (error) {
		// Log errors only in development
		if (process.env.NODE_ENV === 'development') {
			console.error('Error fetching data from Sanity:', error);
			console.error('Query:', query);
		}
		if (defaultValue !== undefined) {
			return defaultValue;
		}
		throw new Error(`Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
};

export const fetchHero = async (): Promise<Hero | null> => {
	const query = groq`
		*[_type == "hero"][0] {
			greeting,
			name,
			slogan,
			description,
			skillDescription
		}
	`;

	try {
		return await dataFetcher<Hero>(query);
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Failed to fetch hero data:', error);
		}
		return null;
	}
};

export const fetchAbout = async (): Promise<About | null> => {
	const query = groq`
		*[_type == "about"][0] {
			paragraph1,
			paragraph2,
			"selfieURL": selfie.asset->url,
			"aboutMeImageURL": aboutMeImage.asset->url
		}
	`;

	try {
		return await dataFetcher<About>(query);
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Failed to fetch about data:', error);
		}
		return null;
	}
};

export const fetchSkills = async (): Promise<Skill[]> => {
	const query = groq`
		*[_type == "skill"]
	`;

	try {
		return await dataFetcher<Skill[]>(query, []);
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Failed to fetch skills data:', error);
		}
		return [];
	}
};

export const fetchProjects = async (): Promise<Project[]> => {
	const query = groq`
		*[_type == "project"] {
			title,
			summary,
			dateCompleted,
			order,
			githubLink,
			demoLink,
			"desktopImageURL": desktopImage.asset->url,
			"mobileImageURL": mobileImage.asset->url,
			category->,
			technologies[]->
		}
	`;

	try {
		return await dataFetcher<Project[]>(query, []);
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Failed to fetch projects data:', error);
		}
		return [];
	}
};

export const fetchResume = async (): Promise<{ resumeURL: string } | null> => {
	const query = groq`
		*[_type == "resume"][0] {
			"resumeURL": resume.asset->url
		}
	`;

	try {
		return await dataFetcher<{ resumeURL: string }>(query);
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Failed to fetch resume data:', error);
		}
		return null;
	}
};

// Blog-related fetch functions with bilingual support

export const fetchBlogPosts = async (language?: Language): Promise<BlogPost[]> => {
	const languageFilter = language 
		? language === 'en' 
			? '&& defined(title)'
			: '&& defined(title_zh)'
		: '';

	const query = groq`
		*[_type == "post" && status == "published" ${languageFilter}] | order(publishedAt desc) {
			_id,
			title,
			title_zh,
			slug,
			summary,
			summary_zh,
			metaTitle,
			metaTitle_zh,
			metaDescription,
			metaDescription_zh,
			featuredImage {
				asset-> {
					url
				},
				alt
			},
			author-> {
				_id,
				name,
				slug
			},
			categories[]-> {
				_id,
				name,
				name_zh,
				slug
			},
			tags[]-> {
				_id,
				name,
				name_zh,
				slug
			},
			publishedAt,
			updatedAt,
			keywords,
			keywords_zh
		}
	`;

	try {
		return await dataFetcher<BlogPost[]>(query, []);
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Failed to fetch blog posts:', error);
		}
		return [];
	}
};

export const fetchBlogPost = async (slug: string, language?: Language): Promise<BlogPost | null> => {
	const query = groq`
		*[_type == "post" && slug.current == $slug && status == "published"][0] {
			_id,
			title,
			title_zh,
			slug,
			summary,
			summary_zh,
			content,
			content_zh,
			metaTitle,
			metaTitle_zh,
			metaDescription,
			metaDescription_zh,
			featuredImage {
				asset-> {
					url
				},
				alt
			},
			author-> {
				_id,
				name,
				slug,
				bio,
				image {
					asset-> {
						url
					}
				}
			},
			categories[]-> {
				_id,
				name,
				name_zh,
				slug,
				description,
				description_zh
			},
			tags[]-> {
				_id,
				name,
				name_zh,
				slug
			},
			publishedAt,
			updatedAt,
			keywords,
			keywords_zh
		}
	`;

	try {
		return await sanityClient.fetch<BlogPost>(query, { slug });
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Failed to fetch blog post:', error);
		}
		return null;
	}
};

export const fetchBlogCategories = async (language?: Language): Promise<BlogCategory[]> => {
	const query = groq`
		*[_type == "blogCategory"] | order(name asc) {
			_id,
			name,
			name_zh,
			slug,
			description,
			description_zh,
			keywords,
			keywords_zh
		}
	`;

	try {
		return await dataFetcher<BlogCategory[]>(query, []);
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Failed to fetch blog categories:', error);
		}
		return [];
	}
};

export const fetchBlogTags = async (language?: Language): Promise<BlogTag[]> => {
	const query = groq`
		*[_type == "tag"] | order(name asc) {
			_id,
			name,
			name_zh,
			slug
		}
	`;

	try {
		return await dataFetcher<BlogTag[]>(query, []);
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Failed to fetch blog tags:', error);
		}
		return [];
	}
};

export const fetchBlogFAQs = async (postId: string): Promise<BlogFAQ[]> => {
	const query = groq`
		*[_type == "blogFAQ" && blogPost._ref == $postId && isActive == true] | order(order asc) {
			_id,
			blogPost,
			language,
			question,
			question_zh,
			answer,
			answer_zh,
			order,
			category,
			isActive
		}
	`;

	try {
		return await sanityClient.fetch<BlogFAQ[]>(query, { postId });
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Failed to fetch blog FAQs:', error);
		}
		return [];
	}
};

export const fetchPostsByCategory = async (categorySlug: string, language?: Language): Promise<BlogPost[]> => {
	const postLanguageFilter = language 
		? language === 'en' 
			? '&& defined(title)'
			: '&& defined(title_zh)'
		: '';

	const query = groq`
		*[_type == "post" && status == "published" && $categorySlug in categories[]->slug.current ${postLanguageFilter}] | order(publishedAt desc) {
			_id,
			title,
			title_zh,
			slug,
			summary,
			summary_zh,
			metaTitle,
			metaTitle_zh,
			metaDescription,
			metaDescription_zh,
			featuredImage {
				asset-> {
					url
				},
				alt
			},
			author-> {
				_id,
				name,
				slug
			},
			categories[]-> {
				_id,
				name,
				name_zh,
				slug
			},
			publishedAt,
			keywords,
			keywords_zh
		}
	`;

	try {
		return await sanityClient.fetch<BlogPost[]>(query, { categorySlug });
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Failed to fetch posts by category:', error);
		}
		return [];
	}
};

export const fetchPostsByTag = async (tagSlug: string, language?: Language): Promise<BlogPost[]> => {
	const postLanguageFilter = language 
		? language === 'en' 
			? '&& defined(title)'
			: '&& defined(title_zh)'
		: '';

	const query = groq`
		*[_type == "post" && status == "published" && $tagSlug in tags[]->slug.current ${postLanguageFilter}] | order(publishedAt desc) {
			_id,
			title,
			title_zh,
			slug,
			summary,
			summary_zh,
			metaTitle,
			metaTitle_zh,
			metaDescription,
			metaDescription_zh,
			featuredImage {
				asset-> {
					url
				},
				alt
			},
			author-> {
				_id,
				name,
				slug
			},
			tags[]-> {
				_id,
				name,
				name_zh,
				slug
			},
			publishedAt,
			keywords,
			keywords_zh
		}
	`;

	try {
		return await sanityClient.fetch<BlogPost[]>(query, { tagSlug });
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Failed to fetch posts by tag:', error);
		}
		return [];
	}
};
