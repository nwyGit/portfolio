import { FC } from "react";
// import { getBlogs } from "../lib/sanity/queries";
import Layout from "@/components/v2/Layout";
import BlogSection from "@/components/v2/sections/BlogSection";
import { SEO } from "@/components/v2/shared/component/SEO";
import { BlogPost } from "@/components/v2/shared/type/types";
import { getBreadcrumbListSchema } from "@/utils/schemaBlogPosting";

interface BlogsPageProps {
	blogs: BlogPost[];
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
			<SEO
				title="Blog | Raymond Ng"
				description="Read the latest blog posts by Raymond Ng on web development, React, TypeScript, and more."
				canonical="https://raymond-ng.com/blogs"
				extraStructuredData={[
					getBreadcrumbListSchema([
						{ name: "Home", url: "https://raymond-ng.com" },
						{ name: "Blogs", url: "https://raymond-ng.com/blogs" },
					]),
				]}
			/>
			<main>
				<BlogSection blogs={blogs} />
			</main>
		</Layout>
	);
};

export default BlogsPage;
