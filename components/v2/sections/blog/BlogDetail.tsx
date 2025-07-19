import { BlogPost } from "@/components/v2/shared/type/types";
import React from "react";
import Breadcrumbs, {
	BreadcrumbItem,
} from "../../shared/component/Breadcrumbs";
import Share from "./BlogShare";
import Image from "next/image";
import { PortableTextBlock } from '@portabletext/types';

interface BlogDetailProps {
	post: BlogPost;
	items: BreadcrumbItem[];
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, items }) => {
	// Extract text content from PortableText blocks
	const getTextContent = (blocks: PortableTextBlock[]): string => {
		return blocks
			?.map(block => {
				if (block._type === 'block' && block.children) {
					return block.children.map((child) => (child as any).text).join('');
				}
				return '';
			})
			.join('\n\n');
	};
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
						{post.tags?.map((tag, idx) => (
							<span className="blog-detail-tag" key={(typeof tag === 'string' ? tag : tag.name) + idx}>
								{typeof tag === 'string' ? tag : tag.name}
							</span>
						))}
					</div>
					{/* Main Image */}
					<div className="blog-detail-image-container">
						{post.featuredImage?.asset?.url ? (
							<Image
								src={post.featuredImage.asset.url}
								alt={post.featuredImage.alt || "Blog Detail"}
								width={700}
								height={467}
								sizes="(max-width: 700px) 100vw, 700px"
								style={{ width: "100%", height: "auto" }}
								placeholder="blur"
								blurDataURL="/assets/blog/image_blog_detail_1.png"
								priority={false}
							/>
						) : (
							<Image
								src="/assets/blog/image_blog_detail_1.png"
								alt="Blog Detail"
								width={700}
								height={467}
								sizes="(max-width: 700px) 100vw, 700px"
								style={{ width: "100%", height: "auto" }}
								priority={false}
							/>
						)}
					</div>
					{/* Blog Content */}
					<div className="blog-detail-content">
						{getTextContent(post.content).split('\n\n').map((paragraph, idx) => (
							<p key={idx} style={{ marginBottom: '1em' }}>
								{paragraph}
							</p>
						))}
					</div>
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
