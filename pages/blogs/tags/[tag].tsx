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
		tags: ["web-development", "react"],
	},
	{
		slug: "blog-post-2",
		title: "Blog Post 2",
		tags: ["nextjs", "typescript"],
	},
	{
		slug: "blog-post-3",
		title: "Blog Post 3",
		tags: ["web-development", "typescript"],
	},
];

export const getStaticPaths: GetStaticPaths = async () => {
	const tagSet = new Set<string>();
	mockPosts.forEach((p) => p.tags.forEach((tag) => tagSet.add(tag)));
	const tags = Array.from(tagSet);
	return {
		paths: tags.map((tag) => ({ params: { tag: String(tag) } })),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { tag } = context.params as { tag: string };
	const posts = mockPosts.filter((p) => p.tags.includes(tag));
	return {
		props: {
			tag,
			posts,
		},
	};
};

const TagPage: NextPage<{
	tag: string;
	posts: { slug: string; title: string }[];
}> = ({ tag, posts }) => {
	const breadcrumbItems = [
		{ name: "Home", href: "/" },
		{ name: "Blogs", href: "/blogs" },
		{ name: `Tag: ${tag}` },
	];

	const tagTitle = tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ');
	const pageTitle = `${tagTitle} Tag | Raymond Ng Blog`;
	const pageDescription = `Discover all blog posts tagged with ${tagTitle}. ${posts.length} articles covering ${tagTitle} topics and insights.`;
	const canonicalUrl = `https://raymond-ng.com/blogs/tags/${tag}`;

	const breadcrumbSchema = getBreadcrumbListSchema([
		{ name: "Home", url: "https://raymond-ng.com" },
		{ name: "Blogs", url: "https://raymond-ng.com/blogs" },
		{ name: `Tag: ${tagTitle}`, url: canonicalUrl },
	]);

	return (
		<Layout>
			<SEO
				title={pageTitle}
				description={pageDescription}
				canonical={canonicalUrl}
				type="website"
				keywords={`${tagTitle}, tag, blog posts, Raymond Ng, ${tag.replace('-', ' ')}`}
				extraStructuredData={[breadcrumbSchema]}
			/>
			<main className="container mx-auto px-4 py-8">
				<Breadcrumbs items={breadcrumbItems} />
				<div className="mt-6">
					<h1 className="text-4xl font-bold mb-4">Posts Tagged: {tagTitle}</h1>
					<p className="text-lg text-gray-600 mb-8">
						Explore {posts.length} blog posts tagged with {tagTitle}
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
						<p className="text-gray-500">No articles found with this tag.</p>
					)}
				</div>
			</main>
		</Layout>
	);
};

export default TagPage;
