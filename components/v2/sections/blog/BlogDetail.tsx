import { BlogPost } from "@/components/v2/shared/type/types";
import React from "react";
import Breadcrumbs, {
	BreadcrumbItem,
} from "../../shared/component/Breadcrumbs";
import Share from "./BlogShare";
import Image from "next/image";
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from "../../shared/component/PortableTextComponents";

// Helper function to decode HTML entities
const decodeHtmlEntities = (str: string): string => {
	return str
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#x27;/g, "'")
		.replace(/&#x2F;/g, '/');
};

// Helper function to extract Sanity image URLs from HTML
const extractSanityImageUrl = (htmlContent: string): string | null => {
	// Decode HTML entities first
	const decodedHtml = decodeHtmlEntities(htmlContent);
	
	// Look for src attributes with Next.js image URLs
	const srcPattern = /src="([^"]+)"/g;
	const srcMatches: RegExpExecArray[] = [];
	let match;
	while ((match = srcPattern.exec(decodedHtml)) !== null) {
		srcMatches.push(match);
	}
	
	for (const match of srcMatches) {
		const srcUrl = match[1];
		// Check if it's a Next.js image URL with encoded Sanity URL
		if (srcUrl.includes('/_next/image?url=')) {
			const urlMatch = srcUrl.match(/url=([^&]+)/);
			if (urlMatch) {
				try {
					const decodedUrl = decodeURIComponent(urlMatch[1]);
					// Check if it's a Sanity URL
					if (decodedUrl.includes('cdn.sanity.io')) {
						return decodedUrl;
					}
				} catch {
					// If decoding fails, continue to next match
					continue;
				}
			}
		}
		// Also check for direct Sanity URLs
		if (srcUrl.includes('cdn.sanity.io')) {
			return srcUrl;
		}
	}
	
	return null;
};

// Helper function to process HTML content and replace images
const processHtmlContent = (htmlContent: string): React.ReactElement[] => {
	// Split content by figure tags to separate images from text
	const parts = htmlContent.split(/(<figure[^>]*>.*?<\/figure>)/gi);
	
	return parts.map((part, index) => {
		// Check if this part is a figure element
		if (part.includes('<figure') && part.includes('</figure>')) {
			// Extract alt text
			const altMatch = part.match(/alt="([^"]*)"/);
			const alt = altMatch ? altMatch[1] : 'Blog image';
			
			// Try to extract Sanity image URL from the HTML
			const sanityUrl = extractSanityImageUrl(part);
			
			if (sanityUrl) {
				return (
					<figure key={index} className="my-8">
						<div className="relative w-full overflow-hidden rounded-lg shadow-lg">
							<Image
								src={sanityUrl}
								alt={alt}
								width={800}
								height={600}
								className="w-full h-auto object-cover"
								style={{
									maxWidth: '100%',
									height: 'auto',
								}}
							/>
						</div>
					</figure>
				);
			} else {
				// Fallback: render the HTML as-is
				return (
					<div
						key={index}
						dangerouslySetInnerHTML={{ __html: part }}
					/>
				);
			}
		} else if (part.trim()) {
			// Regular HTML content
			return (
				<div
					key={index}
					className="prose-content"
					dangerouslySetInnerHTML={{ __html: part }}
				/>
			);
		}
		return null;
	}).filter(Boolean) as React.ReactElement[];
};

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
								width={1200}
								height={600}
								sizes="100vw"
								style={{ width: "100%", height: "auto" }}
								placeholder="blur"
								blurDataURL="/assets/blog/image_blog_detail_1.png"
								priority={false}
							/>
						) : (
							<Image
								src="/assets/blog/image_blog_detail_1.png"
								alt="Blog Detail"
								width={1200}
								height={600}
								sizes="100vw"
								style={{ width: "100%", height: "auto" }}
								priority={false}
							/>
						)}
					</div>
					{/* Blog Content */}
					<div className="blog-detail-content">
						{post.content && Array.isArray(post.content) && post.content.length > 0 ? (
							<div className="prose prose-lg max-w-none">
								{post.content.map((block: any, index) => {
									// Handle image blocks
									if (block._type === 'image') {
										return (
											<figure key={index} className="my-8">
												<div className="relative w-full overflow-hidden rounded-lg shadow-lg">
													<Image
														src={block.asset?.url || '/assets/blog/image_blog_detail_1.png'}
														alt={block.alt || 'Blog post image'}
														width={800}
														height={600}
														className="w-full h-auto object-cover"
														style={{
															maxWidth: '100%',
															height: 'auto',
														}}
													/>
												</div>
												{block.caption && (
													<figcaption className="mt-3 text-center text-sm text-gray-600 italic">
														{block.caption}
													</figcaption>
												)}
											</figure>
										);
									}
									// Handle text blocks with potential HTML content
									else if (block._type === 'block' && block.children) {
										const textContent = block.children.map((child: any) => child.text).join('');
										// Check if the content contains HTML tags
										if (textContent.includes('<') && textContent.includes('>')) {
											// Process HTML content to extract and properly render images
											const processedContent = processHtmlContent(textContent);
											return (
												<div key={index}>
													{processedContent}
												</div>
											);
										} else {
											// Regular PortableText rendering for non-HTML content
											return (
												<PortableText 
													key={index}
													value={[block]} 
													components={portableTextComponents}
												/>
											);
										}
									}
									return null;
								})}
							</div>
						) : (
							<div className="no-content">
								<p style={{ marginBottom: '1em', color: '#666', fontStyle: 'italic' }}>
									No content available for this blog post.
								</p>
							</div>
						)}
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
