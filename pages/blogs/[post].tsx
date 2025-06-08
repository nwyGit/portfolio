import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import BlogDetail from "@/components/v2/sections/Blog/BlogDetail";
import Head from "next/head";
import Layout from "@/components/v2/Layout";

interface BlogPostProps {
	post: {
		title: string;
		content: string;
		date: string;
		tags: string[];
	};
}

const mockPosts = [
	{
		slug: "blog-post-1",
		title: "Blog Post 1",
		content:
			"This is a sample blog post content. It will be replaced with actual content from Sanity later.",
		date: "March 1, 2024",
		tags: ["Web Development", "React"],
	},
	{
		slug: "blog-post-2",
		title: "Blog Post 2",
		content:
			"Another sample blog post content. This will also be replaced with actual content from Sanity later.",
		date: "March 2, 2024",
		tags: ["TypeScript", "Next.js"],
	},
];

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: mockPosts.map((post) => ({ params: { post: post.slug } })),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { post } = context.params as { post: string };
	const found = mockPosts.find((p) => p.slug === post);
	return {
		props: {
			post: found || { title: "", content: "", date: "", tags: [] },
		},
	};
};

const BlogPostPage: NextPage<BlogPostProps> = ({ post }) => {
	return (
		<Layout>
			<Head>
				<title>Raymond Ng</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<BlogDetail post={post} />
			</main>
		</Layout>
	);
};

export default BlogPostPage;
