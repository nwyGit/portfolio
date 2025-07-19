import React, { useMemo, useState } from "react";
import BlogCard from "@/components/v2/sections/blog/BlogCard";
import CategoryFilter, {
	Category,
} from "@/components/v2/shared/component/CategoryFilter";
import { BlogPost } from "@/components/v2/shared/type/types";

interface PortableTextChild {
	_type?: string;
	text?: string;
	marks?: string[];
}

interface BlogsProps {
	blogs: BlogPost[];
}

const BlogSection: React.FC<BlogsProps> = ({ blogs }) => {
	const [active, setActive] = useState("all");
	const [search, setSearch] = useState("");

	const categories: Category[] = useMemo(() => {
		const tagSet = new Set<string>();
		blogs.forEach((blog) => {
			blog.tags?.forEach((tag) => {
				const tagName = typeof tag === "string" ? tag : tag.name;
				tagSet.add(tagName);
			});
		});
		return [
			{ id: "all", label: "All" },
			...Array.from(tagSet).map((tag) => ({ id: tag, label: tag })),
		];
	}, [blogs]);

	const filteredBlogs = useMemo(() => {
		const byCategory =
			active === "all"
				? blogs
				: blogs.filter((blog) =>
						blog.tags?.some((tag) => {
							const tagName = typeof tag === "string" ? tag : tag.name;
							return tagName === active;
						})
					);
		if (!search.trim()) return byCategory;
		return byCategory.filter((blog) => {
			const contentText =
				blog.content
					?.map((block) => {
						if (block._type === "block" && block.children) {
							return block.children
								.map((child) => (child as PortableTextChild).text || "")
								.join("");
						}
						return "";
					})
					.join(" ") || "";

			return (
				blog.title.toLowerCase().includes(search.toLowerCase()) ||
				contentText.toLowerCase().includes(search.toLowerCase())
			);
		});
	}, [blogs, active, search]);

	return (
		<section className="pt-[130px]">
			<div
				style={{
					position: "relative",
					textAlign: "center",
					marginBottom: 24,
					maxWidth: 1200,
					margin: "0 auto 24px auto",
					padding: "0 20px",
				}}
			>
				<h2 className="project-section-title" style={{ margin: 0 }}>Blogs</h2>
				<input
					type="text"
					placeholder="Search blogs..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					style={{
						position: "absolute",
						right: 20,
						top: "50%",
						transform: "translateY(-50%)",
						padding: 8,
						borderRadius: 6,
						border: "1px solid #ccc",
						width: 320,
						fontSize: 16,
					}}
				/>
			</div>

			<div
				style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
			>
				<CategoryFilter
					categories={categories}
					active={active}
					setActive={setActive}
					className="project-section-categories"
					btnClassName="category-filter-btn"
					btnActiveClassName="category-filter-btn--active"
					highlighterClassName="category-filter-highlighter"
					withHighlighter
				/>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 60,
					padding: "40px 0",
					width: "100%",
					background: "#fff",
				}}
			>
				{filteredBlogs.map((blog, i) => (
					<BlogCard key={i} post={blog} />
				))}
			</div>
		</section>
	);
};

export default BlogSection;
