import { BlogPost } from "@/components/v2/shared/type/types";
import React from "react";
import Breadcrumbs, {
	BreadcrumbItem,
} from "../../shared/component/Breadcrumbs";
import Share from "./BlogShare";

interface BlogDetailProps {
	post: BlogPost;
	items: BreadcrumbItem[];
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, items }) => {
	return (
		<section className="blog-detail-section">
			{/* Breadcrumb */}
			<Breadcrumbs items={items} />
			<div className="blog-detail-content">
				<div className="blog-detail-main">
					{/* Title & Date */}
					<div className="blog-detail-title-date">
						<div className="blog-detail-title">{post.title}</div>
						<div className="blog-detail-date" style={{ color: "#8b8b8b" }}>
							{post.publishedAt
								? new Date(post.publishedAt).toLocaleDateString()
								: ""}
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
							src={
								post.featuredImage?.url ||
								"/assets/blog/image_blog_detail_1.png"
							}
							alt={post.featuredImage?.alt || "Blog Detail"}
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
