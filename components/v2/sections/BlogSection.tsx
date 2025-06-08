import React, { useMemo, useState } from "react";
import BlogCard from "@/components/v2/sections/blog/Card";
import CategoryFilter, {
	Category,
} from "@/components/v2/shared/component/CategoryFilter";

interface Blog {
	id: string;
	title: string;
	content: string;
	date: string;
	author: {
		name: string;
		image: string;
	};
	tags: string[];
}

interface BlogsProps {
	blogs: Blog[];
}

const BlogSection: React.FC<BlogsProps> = ({ blogs }) => {
	const [active, setActive] = useState("all");

	const categories: Category[] = useMemo(() => {
		const tagSet = new Set<string>();
		blogs.forEach((blog) => blog.tags.forEach((tag) => tagSet.add(tag)));
		return [
			{ id: "all", label: "All" },
			...Array.from(tagSet).map((tag) => ({ id: tag, label: tag })),
		];
	}, [blogs]);

	const filteredBlogs =
		active === "all"
			? blogs
			: blogs.filter((blog) => blog.tags.includes(active));

	return (
		<section className="pt-[130px]">
			<h2 className="project-section-title">Blogs</h2>
			<div
				style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
			>
				<CategoryFilter
					categories={categories}
					active={active}
					setActive={setActive}
					className="project-section-categories"
					btnClassName="category-filter-btn"
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
				{filteredBlogs.map((blog, idx) => (
					<BlogCard key={blog.id} {...blog} />
				))}
			</div>
		</section>
	);
};

export default BlogSection;
