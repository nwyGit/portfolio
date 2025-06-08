import React from "react";
import Share from "./Share";

interface BlogDetailProps {
	post: {
		title: string;
		content: string;
		date: string;
		tags: string[];
	};
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post }) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				gap: 100,
				padding: "0 100px",
				background: "#fff",
				width: "100%",
				boxSizing: "border-box",
				paddingTop: 130,
			}}
		>
			{/* Left: Image */}
			<div
				style={{
					width: 700,
					height: 466.67,
					background: "#fff",
					borderRadius: 10,
					overflow: "hidden",
					flexShrink: 0,
				}}
			>
				<img
					src="/assets/blog/image_blog_detail_1.png"
					alt="Blog Detail"
					style={{ width: "100%", height: "100%", objectFit: "cover" }}
					onError={(e) => {
						(e.target as HTMLImageElement).src =
							"https://via.placeholder.com/700x467?text=Blog+Image";
					}}
				/>
			</div>
			{/* Right: Content + Share */}
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					gap: 40,
					maxWidth: 700,
					width: "100%",
				}}
			>
				{/* Blog Detail Content */}
				<div
					style={{ flex: 1, display: "flex", flexDirection: "column", gap: 25 }}
				>
					{/* Title & Meta */}
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: 20,
							width: "100%",
						}}
					>
						{/* Title */}
						<div
							style={{
								fontFamily: "Red Hat Display, Ubuntu, sans-serif",
								fontWeight: 700,
								fontSize: 36,
								lineHeight: 1.15,
								color: "#000",
								marginBottom: 4,
								wordBreak: "break-word",
							}}
						>
							Blog Detail Title
						</div>
						{/* Date & Tags */}
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								gap: 30,
								fontFamily: "Ubuntu, sans-serif",
								fontWeight: 300,
								fontSize: 16,
								color: "#000",
							}}
						>
							<span>2024-06-08</span>
							<span
								style={{
									display: "inline-flex",
									alignItems: "center",
									justifyContent: "center",
									padding: "5px 10px",
									background: "rgba(0,0,0,0.05)",
									borderRadius: 5,
									fontFamily: "Red Hat Display, sans-serif",
									fontWeight: 400,
									fontSize: 15,
									color: "#000",
								}}
							>
								Tag1
							</span>
							<span
								style={{
									display: "inline-flex",
									alignItems: "center",
									justifyContent: "center",
									padding: "5px 10px",
									background: "rgba(0,0,0,0.05)",
									borderRadius: 5,
									fontFamily: "Red Hat Display, sans-serif",
									fontWeight: 400,
									fontSize: 15,
									color: "#000",
								}}
							>
								Tag2
							</span>
						</div>
					</div>
					{/* Divider */}
					<div
						style={{
							width: "100%",
							height: 1,
							background: "rgba(0,0,0,0.25)",
							margin: "20px 0",
						}}
					/>
					{/* Content */}
					<div
						style={{
							fontFamily: "Red Hat Text, sans-serif",
							fontWeight: 300,
							fontSize: 16,
							lineHeight: 1.32,
							color: "#000",
							marginBottom: 20,
						}}
					>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do it
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation. Lorem ipsum dolor sit
						amet, consectetur adipisicing elit, sed do it eiusmod tempor
						incididunt utlabore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur
						adipisicing elit, sed do it eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation.
					</div>
					<div
						style={{
							fontFamily: "Red Hat Text, sans-serif",
							fontWeight: 300,
							fontSize: 16,
							lineHeight: 1.32,
							color: "#000",
						}}
					>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do it
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation. Lorem ipsum dolor sit
						amet, consectetur adipisicing elit, sed do it eiusmod tempor
						incididunt utlabore et dolore magna aliqua. Ut enim ad minim veniam,
						quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur
						adipisicing elit, sed do it eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation.
					</div>
				</div>
				{/* Share Section */}
				<div style={{ alignSelf: "flex-start" }}>
					<Share />
				</div>
			</div>
		</div>
	);
};

export default BlogDetail;
