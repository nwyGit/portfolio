import { FC } from "react";
// import { getBlogs } from "../lib/sanity/queries";
import BlogSection from "@/components/v2/sections/BlogSection";
import Layout from "@/components/v2/Layout";
import Head from "next/head";

interface BlogsPageProps {
	blogs: any[];
}

export async function getStaticProps() {
	// const blogs = await getBlogs();
	const blogs = [
		{
			id: "1",
			title: "Blog Post 1",
			content:
				"This is a sample blog post content. It will be replaced with actual content from Sanity later.",
			date: "March 1, 2024",
			author: {
				name: "Raymond Ng",
				image: "",
			},
			tags: ["Web Development", "React"],
		},
		{
			id: "2",
			title: "Blog Post 2",
			content:
				"Another sample blog post content. This will also be replaced with actual content from Sanity later.",
			date: "March 2, 2024",
			author: {
				name: "Raymond Ng",
				image: "",
			},
			tags: ["TypeScript", "Next.js"],
		},
	];

	return {
		props: {
			blogs,
		},
		revalidate: 60, // Revalidate every minute
	};
}

const BlogsPage: FC<BlogsPageProps> = ({ blogs }) => {
	return (
		<Layout>
			<Head>
				<title>Raymond Ng</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<BlogSection blogs={blogs} />
			</main>
		</Layout>
	);
};

export default BlogsPage;
