import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";

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
	return (
		<div style={{ padding: 40 }}>
			<h1>Category: {category}</h1>
			<ul>
				{posts.map((post) => (
					<li key={post.slug}>
						<Link href={`/blogs/${post.slug}`}>{post.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CategoryPage;
