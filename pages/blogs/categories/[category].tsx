import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Layout from "@/components/v2/Layout";
import { SEO } from "@/components/v2/shared/component/SEO";
import Breadcrumbs from "@/components/v2/shared/component/Breadcrumbs";
import { getBreadcrumbListSchema } from "@/utils/schemaBlogPosting";

const mockPosts = [
	{
		slug: "blog-post-1",
		title: "Blog Post 1",
		category: "web-development",
	},
	{
		slug: "blog-post-2",
		title: "Blog Post 2",
		category: "nextjs",
	},
	{
		slug: "blog-post-3",
		title: "Blog Post 3",
		category: "web-development",
	},
];

export const getStaticPaths: GetStaticPaths = async () => {
	const categories = Array.from(new Set(mockPosts.map((p) => p.category)));
	return {
		paths: categories.map((category) => ({ params: { category } })),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { category } = context.params as { category: string };
	const posts = mockPosts.filter((p) => p.category === category);
	return {
		props: {
			category,
			posts,
		},
	};
};

const CategoryPage: NextPage<{
	category: string;
	posts: { slug: string; title: string }[];
}> = ({ category, posts }) => {
	const breadcrumbItems = [
		{ name: "Home", href: "/" },
		{ name: "Blogs", href: "/blogs" },
		{ name: category },
	];

	const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
	const pageTitle = `${categoryTitle} Blog Posts | Raymond Ng`;
	const pageDescription = `Explore all blog posts in the ${categoryTitle} category. ${posts.length} articles covering topics in ${categoryTitle}.`;
	const canonicalUrl = `https://raymond-ng.com/blogs/categories/${category}`;

	const breadcrumbSchema = getBreadcrumbListSchema([
		{ name: "Home", url: "https://raymond-ng.com" },
		{ name: "Blogs", url: "https://raymond-ng.com/blogs" },
		{ name: categoryTitle, url: canonicalUrl },
	]);

	return (
		<Layout>
			<SEO
				title={pageTitle}
				description={pageDescription}
				canonical={canonicalUrl}
				type="website"
				keywords={`${categoryTitle}, blog, articles, Raymond Ng, ${category.replace('-', ' ')}`}
				extraStructuredData={[breadcrumbSchema]}
			/>
			<main className="container mx-auto px-4 py-8">
				<Breadcrumbs items={breadcrumbItems} />
				<div className="mt-6">
					<h1 className="text-4xl font-bold mb-4">{categoryTitle} Articles</h1>
					<p className="text-lg text-gray-600 mb-8">
						Browse {posts.length} blog posts in the {categoryTitle} category
					</p>
					
					{posts.length > 0 ? (
						<div className="grid gap-6">
							{posts.map((post) => (
								<article key={post.slug} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
									<h2 className="text-xl font-semibold mb-2">
										<Link href={`/blogs/${post.slug}`} className="text-blue-600 hover:text-blue-800">
											{post.title}
										</Link>
									</h2>
									<Link href={`/blogs/${post.slug}`} className="text-blue-500 hover:underline">
										Read more →
									</Link>
								</article>
							))}
						</div>
					) : (
						<p className="text-gray-500">No articles found in this category.</p>
					)}
				</div>
			</main>
		</Layout>
	);
};

export default CategoryPage;
