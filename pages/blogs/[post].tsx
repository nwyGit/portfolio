import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import BlogDetail from "@/components/v2/sections/blog/BlogDetail";
import { SEO } from "@/components/v2/shared/component/SEO";
import {
	getBlogPostingSchema,
	getBreadcrumbListSchema,
} from "@/utils/schemaBlogPosting";
import { validateMetaTags } from "@/utils/metaTagValidation";
import Layout from "@/components/v2/Layout";
import { BlogPost } from "@/components/v2/shared/type/types";
import { PortableTextBlock } from '@portabletext/types';
import { fetchBlogPosts, fetchBlogPost } from "@/utils/fetchData";

interface PortableTextChild {
	_type?: string;
	text?: string;
	marks?: string[];
}

// Helper function to extract text from PortableText content
const getContentPreview = (content: PortableTextBlock[]): string => {
	return content
		?.map(block => {
			if (block._type === 'block' && block.children) {
				return block.children.map((child) => (child as PortableTextChild).text || '').join('');
			}
			return '';
		})
		.join(' ')
		.slice(0, 150);
};

interface BlogPostProps {
	post: BlogPost;
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const posts = await fetchBlogPosts();
		
		const paths = posts.map((post) => ({
			params: { post: post.slug.current },
		}));

		return {
			paths,
			fallback: 'blocking',
		};
	} catch (error) {
		console.error('Failed to fetch blog posts for static paths:', error);
		return {
			paths: [],
			fallback: 'blocking',
		};
	}
};

export const getStaticProps: GetStaticProps = async (context) => {
	try {
		const { post: slug } = context.params as { post: string };
		const post = await fetchBlogPost(slug);
		
		if (!post) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				post,
			},
			revalidate: 60,
		};
	} catch (error) {
		console.error('Failed to fetch blog post:', error);
		return {
			notFound: true,
		};
	}
};

const BlogPostPage: NextPage<BlogPostProps> = ({ post }) => {
	const url = post.canonicalUrl || `https://raymond-ng.com/blogs/${post.slug.current}`;
	const image =
		post.featuredImage?.asset?.url || "https://raymond-ng.com/default-blog-image.jpg";
	const schemaMarkup = getBlogPostingSchema({
		title: post.metaTitle || post.title,
		description:
			post.metaDescription || post.summary || getContentPreview(post.content),
		url,
		image,
		datePublished: post.publishedAt,
		dateModified: post.updatedAt,
		authorName: post.author?.name || "Raymond Ng",
	});

	const breadcrumbItems = [
		{ name: "Home", href: "/" },
		{ name: "Blogs", href: "/blogs" },
		// If categories exist, add the first one
		...(post.categories && post.categories.length > 0
			? [
					{
						name: post.categories[0].name,
						href: `/blogs/categories/${post.categories[0].name}`,
					},
				]
			: []),
		{ name: post.title },
	];

	const breadcrumbSchema = getBreadcrumbListSchema(
		breadcrumbItems.map(({ name, href }) => ({
			name,
			url: href ? `https://raymond-ng.com${href}` : url,
		}))
	);

	const metaErrors = validateMetaTags({
		title: post.metaTitle || post.title,
		description:
			post.metaDescription || post.summary || getContentPreview(post.content),
		canonical: url,
		image,
	});
	if (metaErrors.length > 0 && process.env.NODE_ENV === 'development') {
		console.warn("SEO Meta Tag Issues:", metaErrors);
	}

	return (
		<Layout>
			<SEO
				title={post.metaTitle || post.title}
				description={
					post.metaDescription || post.summary || getContentPreview(post.content)
				}
				canonical={url}
				image={image}
				type="article"
				datePublished={post.publishedAt}
				dateModified={post.updatedAt}
				schemaMarkup={schemaMarkup}
				extraStructuredData={[breadcrumbSchema]}
				// twitterCardType="summary_large_image"
				// twitterSite="@raymondngdev"
				// twitterCreator="@raymondngdev"
			/>
			<main>
				<BlogDetail post={post} items={breadcrumbItems} />
			</main>
		</Layout>
	);
};

export default BlogPostPage;
