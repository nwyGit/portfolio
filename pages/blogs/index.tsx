import { FC } from "react";
import { GetStaticProps } from "next";
import Layout from "@/components/v2/Layout";
import BlogSection from "@/components/v2/sections/BlogSection";
import { SEO } from "@/components/v2/shared/component/SEO";
import { BlogPost } from "@/components/v2/shared/type/types";
import { getBreadcrumbListSchema } from "@/utils/schemaBlogPosting";
import { fetchBlogPosts } from "@/utils/fetchData";
import { useRouter } from "next/router";
import Link from "next/link";

interface BlogsPageProps {
	blogs: BlogPost[];
}

export const getStaticProps: GetStaticProps<BlogsPageProps> = async () => {
	try {
		const blogs = await fetchBlogPosts();

		return {
			props: {
				blogs,
			},
			revalidate: 60, // Revalidate every minute
		};
	} catch (error) {
		console.error('Failed to fetch blog posts:', error);
		return {
			props: {
				blogs: [],
			},
			revalidate: 60,
		};
	}
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
