import { GetStaticProps, GetStaticPaths } from 'next';
import { groq } from 'next-sanity';
import { sanityClient } from '@/utils/sanity';
import { BlogPost, BlogFAQ } from '@/components/v2/shared/type/types';
import { localizeBlogPost, generateHreflangLinks } from '@/utils/languageUtils';
import Layout from '@/components/v2/Layout';
import Head from 'next/head';
import BlogDetail from '@/components/v2/sections/blog/BlogDetail';

interface BlogPostPageProps {
	post: BlogPost;
	faqs: BlogFAQ[];
}

export default function ChineseBlogPost({ post, faqs }: BlogPostPageProps) {
	const localizedPost = localizeBlogPost(post, 'zh-Hant');
	const hreflangLinks = generateHreflangLinks(`/blogs/${post.slug?.current || localizedPost.slug.current}`);

	const breadcrumbItems = [
		{ name: "首頁", href: "/" },
		{ name: "部落格", href: "/zh/blogs" },
		// If categories exist, add the first one
		...(post.categories && post.categories.length > 0
			? [
					{
						name: post.categories[0].name_zh || post.categories[0].name,
						href: `/zh/blogs/categories/${post.categories[0].slug?.current}`,
					},
				]
			: []),
		{ name: localizedPost.title },
	];

	return (
		<Layout>
			<Head>
				<title>{localizedPost.metaTitle || localizedPost.title}</title>
				<meta name="description" content={localizedPost.metaDescription || localizedPost.summary} />
				
				{/* Hreflang links for SEO */}
				{hreflangLinks.map(link => (
					<link key={link.hrefLang} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
				))}
				
				{/* Open Graph tags */}
				<meta property="og:title" content={localizedPost.title} />
				<meta property="og:description" content={localizedPost.summary || ''} />
				<meta property="og:type" content="article" />
				<meta property="og:locale" content="zh_TW" />
				{localizedPost.featuredImage && (
					<meta property="og:image" content={localizedPost.featuredImage.asset.url} />
				)}
				
				{/* Article structured data */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "BlogPosting",
							headline: localizedPost.title,
							description: localizedPost.summary,
							author: {
								"@type": "Person",
								name: localizedPost.author.name,
							},
							datePublished: localizedPost.publishedAt,
							dateModified: localizedPost.updatedAt || localizedPost.publishedAt,
							image: localizedPost.featuredImage?.asset.url,
							inLanguage: "zh-TW",
							mainEntityOfPage: {
								"@type": "WebPage",
								"@id": `/zh/blogs/${localizedPost.slug.current}`,
							},
						}),
					}}
				/>
			</Head>
			
			<main>
				<BlogDetail 
					post={post} 
					items={breadcrumbItems}
					language="zh-Hant"
					faqs={faqs}
				/>
			</main>
		</Layout>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const query = groq`
		*[_type == "post" && status == "published" && defined(title_zh)] {
			slug
		}
	`;

	const posts = await sanityClient.fetch<{ 
		slug: { current: string };
	}[]>(query);
	
	const paths = posts.map((post) => ({
		params: { post: post.slug.current },
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
	const slug = params?.post as string;

	// Find post by slug
	const postQuery = groq`
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
			keywords_zh,
			canonicalUrl
		}
	`;

	const faqQuery = groq`
		*[_type == "blogFAQ" && blogPost._ref == $postId && isActive == true] | order(order asc) {
			_id,
			question,
			question_zh,
			answer,
			answer_zh,
			order,
			category
		}
	`;

	const post = await sanityClient.fetch<BlogPost>(postQuery, { slug });

	if (!post || !post.title_zh) {
		return {
			notFound: true,
		};
	}

	const faqs = await sanityClient.fetch<BlogFAQ[]>(faqQuery, { postId: post._id });

	return {
		props: {
			post,
			faqs: faqs || [],
		},
		revalidate: 60,
	};
};