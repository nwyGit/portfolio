import { FC } from "react";
// import { getBlogs } from "../lib/sanity/queries";
import Blogs from "@/components/v2/Blogs";

interface BlogsPageProps {
	blogs: any[]; // TODO: Add proper type from Sanity schema
}

const BlogsPage: FC<BlogsPageProps> = ({ blogs }) => {
	return <Blogs blogs={blogs} />;
};

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

export default BlogsPage;
