import React from "react";
import Share from "./Share";

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
			<div className="blog-detail-main">
				{/* Title & Date */}
				<div className="blog-detail-title-date">
					<div className="blog-detail-title">{post.title}</div>
					<div className="blog-detail-date">{post.date}</div>
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
		</section>
	);
};

export default BlogDetail;
