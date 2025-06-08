import React from "react";

interface BlogCardProps {
	title: string;
	date: string;
	tags?: string[];
}

const BlogCard: React.FC<BlogCardProps> = ({ title, date }) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				gap: 20,
				width: "100%",
				background: "#fff",
				borderRadius: 10,
				boxShadow: "none",
				padding: 0,
			}}
		>
			{/* Image */}
			<div
				style={{
					width: 150,
					height: 100,
					borderRadius: 10,
					overflow: "hidden",
					background: "rgba(0,0,0,0.05)",
					flexShrink: 0,
				}}
			>
				<img
					src="/assets/blog/image_blog_detail_1.png"
					alt="Blog Card"
					style={{ width: "100%", height: "100%", objectFit: "cover" }}
					onError={(e) => {
						(e.target as HTMLImageElement).src =
							"https://via.placeholder.com/150x100?text=Blog+Image";
					}}
				/>
			</div>
			{/* Content */}
			<div
				style={{ display: "flex", flexDirection: "column", gap: 5, flex: 1 }}
			>
				<span
					style={{
						fontFamily: "Ubuntu, sans-serif",
						fontWeight: 300,
						fontSize: 14,
						lineHeight: 1.15,
						color: "#8B8B8B",
						marginBottom: 2,
					}}
				>
					{date}
				</span>
				<span
					style={{
						fontFamily: "Red Hat Display, sans-serif",
						fontWeight: 600,
						fontSize: 16,
						lineHeight: 1.32,
						color: "#000",
						wordBreak: "break-word",
					}}
				>
					{title}
				</span>
			</div>
		</div>
	);
};

export default BlogCard;
