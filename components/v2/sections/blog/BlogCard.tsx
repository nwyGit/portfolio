import React from "react";
import DynamicButton from "@/components/v2/shared/component/DynamicButton";
import { RxArrowTopRight } from "react-icons/rx";
import { BlogPost } from "@/components/v2/shared/type/types";
import Image from "next/image";

interface BlogCardProps {
	post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
	const { title, content, tags, publishedAt } = post;
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				gap: 40,
				background: "#fff",
				borderRadius: 16,
				padding: 0,
				maxWidth: 1200,
				width: "100%",
			}}
		>
			{/* Image Section */}
			<div
				style={{
					width: 500,
					height: 333.33,
					background: "rgba(0,0,0,0.05)",
					borderRadius: 10,
					overflow: "hidden",
				}}
			>
				{post.featuredImage?.url ? (
					<Image
						src={post.featuredImage.url}
						alt={post.featuredImage.alt || "Blog Detail"}
						width={500}
						height={333}
						sizes="(max-width: 500px) 100vw, 500px"
						style={{ width: "100%", height: "auto" }}
						placeholder="blur"
						blurDataURL="/assets/blog/image_blog_detail_1.png"
						priority={false}
					/>
				) : (
					<Image
						src="/assets/blog/image_blog_detail_1.png"
						alt="Blog Detail"
						width={500}
						height={333}
						sizes="(max-width: 500px) 100vw, 500px"
						style={{ width: "100%", height: "auto" }}
						priority={false}
					/>
				)}
			</div>
			{/* Content Section */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 24,
					width: 600,
					justifyContent: "space-between",
				}}
			>
				<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
					<div
						style={{
							fontFamily: "Ubuntu, sans-serif",
							fontWeight: 700,
							fontSize: 30,
							lineHeight: 1.15,
							color: "#000",
							marginBottom: 4,
							wordBreak: "break-word",
						}}
					>
						{title}
					</div>
					<div
						style={{
							fontFamily: "Ubuntu, sans-serif",
							fontWeight: 300,
							fontSize: 16,
							lineHeight: 1.15,
							color: "#8b8b8b",
							marginBottom: 8,
						}}
					>
						{publishedAt}
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							gap: 16,
							flexWrap: "wrap",
							marginBottom: 8,
						}}
					>
						{tags.map((tag) => (
							<span
								key={tag}
								style={{
									display: "inline-flex",
									alignItems: "center",
									justifyContent: "center",
									gap: 10,
									padding: "5px 10px",
									background: "rgba(0,0,0,0.05)",
									borderRadius: 5,
									fontFamily: "Red Hat Display, sans-serif",
									fontWeight: 400,
									fontSize: 15,
									lineHeight: 1.32,
									color: "#000",
								}}
							>
								{tag}
							</span>
						))}
					</div>
					<div
						style={{
							fontFamily: "Red Hat Text, sans-serif",
							fontWeight: 300,
							fontSize: 16,
							lineHeight: 1.32,
							color: "#000",
							marginTop: 0,
							display: "-webkit-box",
							WebkitLineClamp: 3,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
							textOverflow: "ellipsis",
							height: "4.2em",
						}}
					>
						{content}
					</div>
				</div>
				{/* Button */}
				<div
					className="blog-card-view-more-btn-wrapper"
					style={{ width: "fit-content" }}
					onMouseOver={(e) => {
						const btn = e.currentTarget.querySelector("button, a");
						if (btn) {
							(btn as HTMLElement).style.background = "#fff";
							(btn as HTMLElement).style.color = "#000";
						}
					}}
					onMouseOut={(e) => {
						const btn = e.currentTarget.querySelector("button, a");
						if (btn) {
							(btn as HTMLElement).style.background = "#000";
							(btn as HTMLElement).style.color = "#fff";
						}
					}}
				>
					<DynamicButton
						text="view more"
						icon={<RxArrowTopRight size={24} />}
						href={`/blogs/${post.slug}`}
						target="_blank"
						className="btn-black"
						style={{
							display: "flex",
							alignItems: "center",
							gap: 10,
							padding: "12px 25px 12px 30px",
							borderRadius: 30,
							border: "1px solid #000",
							background: "#000",
							color: "#fff",
							fontFamily: "Red Hat Display, sans-serif",
							fontWeight: 700,
							fontSize: 16,
							lineHeight: 1.32,
							textTransform: "uppercase",
							cursor: "pointer",
							transition: "background 0.2s, color 0.2s",
							marginTop: 16,
						}}
						iconPosition="right"
					/>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
