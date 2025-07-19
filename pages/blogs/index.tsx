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
	const blogs: BlogPost[] = [
		{
			_id: "1",
			language: "en" as const,
			title: "Blog Post 1",
			slug: { current: "blog-post-1" },
			content: [
				{
					_type: 'block',
					_key: 'content1',
					children: [
						{
							_type: 'span',
							text: 'This is a sample blog post content. It will be replaced with actual content from Sanity later.',
							marks: []
						}
					],
					markDefs: [],
					style: 'normal'
				}
			],
			publishedAt: "2024-03-01T10:00:00Z",
			author: {
				_id: "1",
				name: "Raymond Ng",
			},
			tags: ["Web Development", "React"],
		},
		{
			_id: "2",
			language: "en" as const,
			title: "Blog Post 2",
			slug: { current: "blog-post-2" },
			content: [
				{
					_type: 'block',
					_key: 'content2',
					children: [
						{
							_type: 'span',
							text: 'Another sample blog post content. This will also be replaced with actual content from Sanity later.',
							marks: []
						}
					],
					markDefs: [],
					style: 'normal'
				}
			],
			publishedAt: "2024-03-02T10:00:00Z",
			author: {
				_id: "2",
				name: "Raymond Ng",
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
