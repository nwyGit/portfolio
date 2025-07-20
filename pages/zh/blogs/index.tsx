import { GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import { sanityClient } from '@/utils/sanity';
import { BlogPost } from '@/components/v2/shared/type/types';
import { localizeBlogPost } from '@/utils/languageUtils';
import { useLanguagePreference } from '@/utils/useLanguagePreference';
import Layout from '@/components/v2/Layout';
import BlogSection from '@/components/v2/sections/BlogSection';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface BlogIndexProps {
	posts: BlogPost[];
}

export default function ChineseBlogIndex({ posts }: BlogIndexProps) {
	const router = useRouter();
	const { language, isLoading } = useLanguagePreference();

	// Auto-redirect to preferred language if different from current page
	useEffect(() => {
		if (!isLoading && language === 'en') {
			// User prefers English but is on Chinese page - redirect
			router.replace('/en/blogs');
		}
	}, [language, isLoading, router]);

	// Don't render content if redirecting
	if (!isLoading && language === 'en') {
		return null;
	}

	// Localize all posts for Traditional Chinese
	const localizedPosts = posts.map(post => localizeBlogPost(post, 'zh-Hant'));

	return (
		<Layout>
			<Head>
				<title>部落格 - Raymond Ng</title>
				<meta name="description" content="關於網頁開發、程式設計和技術的最新部落格文章" />
				<link rel="alternate" hrefLang="en" href="/en/blogs" />
				<link rel="alternate" hrefLang="zh-Hant" href="/zh/blogs" />
				<link rel="canonical" href="/zh/blogs" />
			</Head>
			
			<BlogSection blogs={localizedPosts} />
		</Layout>
	);
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
	const query = groq`
		*[_type == "post" && status == "published" && defined(title_zh)] | order(publishedAt desc) {
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
			keywords,
			keywords_zh
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