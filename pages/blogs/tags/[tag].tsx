import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/v2/shared/component/Breadcrumbs";

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
	return (
		<div style={{ padding: 40 }}>
			<Breadcrumbs items={breadcrumbItems} />
			<h1>Tag: {tag}</h1>
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

export default TagPage;
