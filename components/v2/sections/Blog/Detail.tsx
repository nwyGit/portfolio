import React from "react";
import Share from "./Share";
import { FaHome } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

interface BlogDetailProps {
	post: {
		title: string;
		content: string; // HTML string from CMS
		date: string;
		tags: string[];
	};
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post }) => {
	return (
		<section className="blog-detail-section">
			{/* Breadcrumb */}
			<div className="sticky top-[64px] z-10 w-full border-b bg-white py-3 transition-all duration-300 translate-y-0">
				<nav aria-label="breadcrumb">
					<ol className="flex items-center text-sm gap-2">
						<li className="flex items-center">
							<Link
								href="/"
								className="inline-flex items-center hover:text-black transition-colors"
								style={{ color: "#8b8b8b" }}
							>
								<FaHome style={{ width: 16, height: 16, marginRight: 8 }} />
								Home
							</Link>
						</li>
						<li
							aria-hidden="true"
							className="flex items-center"
							style={{ color: "#8b8b8b" }}
						>
							<MdOutlineKeyboardArrowRight />
						</li>
						<li className="flex items-center">
							<Link
								href="/blogs"
								style={{ color: "#8b8b8b" }}
								className="hover:text-black transition-colors"
							>
								Blogs
							</Link>
						</li>
						<li
							aria-hidden="true"
							className="flex items-center"
							style={{ color: "#8b8b8b" }}
						>
							<MdOutlineKeyboardArrowRight />
						</li>
						<li className="flex items-center">
							<span
								role="link"
								aria-disabled="true"
								aria-current="page"
								className="line-clamp-1 font-medium text-black"
							>
								{post.title}
							</span>
						</li>
					</ol>
				</nav>
			</div>
			<div className="blog-detail-content">
				<div className="blog-detail-main">
					{/* Title & Date */}
					<div className="blog-detail-title-date">
						<div className="blog-detail-title">{post.title}</div>
						<div className="blog-detail-date" style={{ color: "#8b8b8b" }}>
							{post.date}
						</div>
					</div>
					{/* Tags */}
					<div className="blog-detail-tags">
						{post.tags.map((tag, idx) => (
							<span className="blog-detail-tag" key={tag + idx}>
								{tag}
							</span>
						))}
					</div>
					{/* Main Image */}
					<div className="blog-detail-image-container">
						<img
							src={"/assets/blog/image_blog_detail_1.png"}
							alt="Blog Detail"
							className="blog-detail-image"
							onError={(e) => {
								(e.target as HTMLImageElement).src =
									"https://via.placeholder.com/700x467?text=Blog+Image";
							}}
						/>
					</div>
					{/* Blog Content (HTML) */}
					<div
						className="blog-detail-content"
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
				</div>
				{/* Share Section */}
				<div className="blog-detail-share">
					<Share />
				</div>
			</div>
		</section>
	);
};

export default BlogDetail;
