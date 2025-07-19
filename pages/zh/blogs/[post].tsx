import { GetStaticProps, GetStaticPaths } from 'next';
import { groq } from 'next-sanity';
import { sanityClient } from '@/utils/sanity';
import { BlogPost, BlogFAQ } from '@/components/v2/shared/type/types';
import { localizeBlogPost, getLocalizedFAQs, generateHreflangLinks, getLocalizedMessages } from '@/utils/languageUtils';
import Layout from '@/components/v2/Layout';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import BlogFAQSection from '@/components/v2/shared/component/BlogFAQSection';

interface BlogPostPageProps {
	post: BlogPost;
	faqs: BlogFAQ[];
}

export default function ChineseBlogPost({ post, faqs }: BlogPostPageProps) {
	const localizedPost = localizeBlogPost(post, 'zh-Hant');
	const localizedFAQs = getLocalizedFAQs(faqs, 'zh-Hant');
	const messages = getLocalizedMessages('zh-Hant');
	const hreflangLinks = generateHreflangLinks(`/blogs/${post.slug?.current || localizedPost.slug.current}`);

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
			
			<main className="container mx-auto px-4 py-8 max-w-4xl">
				{/* Language switcher and back button */}
				<div className="flex justify-between items-center mb-8">
					<Link 
						href="/zh/blogs"
						className="text-blue-600 hover:text-blue-800 transition-colors"
					>
						← {messages.backToBlog}
					</Link>
					<Link 
						href={`/en/blogs/${post.slug?.current || localizedPost.slug.current}`}
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						{messages.switchLanguage}
					</Link>
				</div>

				{/* Featured image */}
				{localizedPost.featuredImage && (
					<div className="mb-8">
						<Image 
							src={localizedPost.featuredImage.asset.url}
							alt={localizedPost.featuredImage.alt || localizedPost.title}
							width={800}
							height={400}
							className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
						/>
					</div>
				)}

				{/* Article header */}
				<header className="mb-8">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						{localizedPost.title}
					</h1>
					
					{localizedPost.summary && (
						<p className="text-xl text-gray-600 mb-6">
							{localizedPost.summary}
						</p>
					)}
					
					<div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
						<span>{messages.by} {localizedPost.author.name}</span>
						<span>•</span>
						<time dateTime={localizedPost.publishedAt}>
							{messages.publishedOn} {new Date(localizedPost.publishedAt).toLocaleDateString('zh-TW', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</time>
						{localizedPost.category && (
							<>
								<span>•</span>
								<span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
									{localizedPost.category.name_zh || localizedPost.category.name}
								</span>
							</>
						)}
					</div>
					
					{localizedPost.tags && localizedPost.tags.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{localizedPost.tags.map((tag) => (
								<span 
									key={typeof tag === 'string' ? tag : tag._id}
									className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
								>
									{typeof tag === 'string' ? tag : (tag.name_zh || tag.name)}
								</span>
							))}
						</div>
					)}
				</header>

				{/* Article content */}
				<article className="prose prose-lg max-w-none mb-12">
					<PortableText value={localizedPost.content} />
				</article>

				{/* FAQ Section */}
				{localizedFAQs.length > 0 && (
					<BlogFAQSection faqs={localizedFAQs} language="zh-Hant" />
				)}
			</main>
		</Layout>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const query = groq`
		*[_type == "post" && status == "published" && defined(title_zh)] {
			slug,
			slug_zh
		}
	`;

	const posts = await sanityClient.fetch<{ 
		slug: { current: string };
		slug_zh?: { current: string };
	}[]>(query);
	
	const paths = posts.map((post) => ({
		params: { post: post.slug_zh?.current || post.slug.current },
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
	const slug = params?.post as string;

	// Try to find post by Chinese slug first, then fallback to English slug
	const postQuery = groq`
		*[_type == "post" && (slug_zh.current == $slug || slug.current == $slug) && status == "published"][0] {
			_id,
			language,
			title,
			title_zh,
			slug,
			slug_zh,
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
			category-> {
				_id,
				name,
				name_zh,
				slug,
				slug_zh,
				description,
				description_zh
			},
			tags[]-> {
				_id,
				name,
				name_zh,
				slug,
				slug_zh
			},
			publishedAt,
			updatedAt,
			keywords,
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
			category,
			language
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