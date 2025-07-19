import { GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import { sanityClient } from '@/utils/sanity';
import { BlogPost } from '@/components/v2/shared/type/types';
import { localizeBlogPost } from '@/utils/languageUtils';
import Layout from '@/components/v2/Layout';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

interface BlogIndexProps {
	posts: BlogPost[];
}

export default function EnglishBlogIndex({ posts }: BlogIndexProps) {
	return (
		<Layout>
			<Head>
				<title>Blog - Raymond Ng</title>
				<meta name="description" content="Latest blog posts about web development, programming, and technology" />
				<link rel="alternate" hrefLang="en" href="/en/blogs" />
				<link rel="alternate" hrefLang="zh-Hant" href="/zh/blogs" />
				<link rel="canonical" href="/en/blogs" />
			</Head>
			
			<main className="container mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-4xl font-bold">Blog Posts</h1>
					<Link 
						href="/zh/blogs"
						className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
					>
						中文版
					</Link>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{posts.map((post) => {
						const localizedPost = localizeBlogPost(post, 'en');
						return (
							<article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
								{localizedPost.featuredImage && (
									<Image 
										src={localizedPost.featuredImage.asset.url}
										alt={localizedPost.featuredImage.alt || localizedPost.title}
										width={400}
										height={192}
										className="w-full h-48 object-cover"
									/>
								)}
								<div className="p-6">
									<h2 className="text-xl font-semibold mb-2">
										<Link 
											href={`/en/blogs/${localizedPost.slug.current}`}
											className="hover:text-blue-600 transition-colors"
										>
											{localizedPost.title}
										</Link>
									</h2>
									{localizedPost.summary && (
										<p className="text-gray-600 mb-4 line-clamp-3">
											{localizedPost.summary}
										</p>
									)}
									<div className="flex justify-between items-center text-sm text-gray-500">
										<span>{localizedPost.author.name}</span>
										<time dateTime={localizedPost.publishedAt}>
											{new Date(localizedPost.publishedAt).toLocaleDateString('en-US')}
										</time>
									</div>
									{localizedPost.category && (
										<div className="mt-3">
											<span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
												{localizedPost.category.name}
											</span>
										</div>
									)}
								</div>
							</article>
						);
					})}
				</div>
			</main>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
	const query = groq`
		*[_type == "post" && status == "published" && defined(title)] | order(publishedAt desc) {
			_id,
			language,
			title,
			title_zh,
			slug,
			slug_zh,
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
			category-> {
				_id,
				name,
				name_zh,
				slug,
				slug_zh
			},
			tags[]-> {
				_id,
				name,
				name_zh,
				slug,
				slug_zh
			},
			publishedAt,
			keywords
		}
	`;

	const posts = await sanityClient.fetch<BlogPost[]>(query);

	return {
		props: {
			posts,
		},
		revalidate: 60,
	};
};