import { FC } from "react";
// import { getBlogs } from "../lib/sanity/queries";
import Layout from "@/components/v2/Layout";
import BlogSection from "@/components/v2/sections/BlogSection";
import { SEO } from "@/components/v2/shared/component/SEO";
import { BlogPost } from "@/components/v2/shared/type/types";
import { getBreadcrumbListSchema } from "@/utils/schemaBlogPosting";
import { useRouter } from "next/router";
import Link from "next/link";

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

const BLOGS_PER_PAGE = 5;

const BlogsPage: FC<BlogsPageProps> = ({ blogs }) => {
	const router = useRouter();
	const page = parseInt((router.query.page as string) || "1", 10);
	const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);
	const paginatedBlogs = blogs.slice(
		(page - 1) * BLOGS_PER_PAGE,
		page * BLOGS_PER_PAGE
	);
	const canonicalUrl = `https://raymond-ng.com/blogs${page > 1 ? `?page=${page}` : ""}`;
	return (
		<Layout>
			<SEO
				title="Blog | Raymond Ng"
				description="Read the latest blog posts by Raymond Ng on web development, React, TypeScript, and more."
				canonical={canonicalUrl}
				extraStructuredData={[
					getBreadcrumbListSchema([
						{ name: "Home", url: "https://raymond-ng.com" },
						{ name: "Blogs", url: "https://raymond-ng.com/blogs" },
					]),
				]}
			/>
			<main>
				<BlogSection blogs={paginatedBlogs} />
				{/* Pagination Controls */}
				<nav
					aria-label="Pagination"
					style={{ marginTop: 40, textAlign: "center" }}
				>
					{page > 1 && (
						<>
							<link rel="prev" href={`/blogs?page=${page - 1}`} />
							<Link href={`/blogs?page=${page - 1}`}>Previous</Link>
						</>
					)}
					{page < totalPages && (
						<>
							<link rel="next" href={`/blogs?page=${page + 1}`} />
							<Link href={`/blogs?page=${page + 1}`} style={{ marginLeft: 16 }}>
								Next
							</Link>
						</>
					)}
				</nav>
			</main>
		</Layout>
	);
};

export default BlogsPage;
