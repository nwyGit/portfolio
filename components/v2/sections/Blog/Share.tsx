import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiWechat } from "react-icons/si";

const ICONS = [
	{
		name: "Facebook",
		Icon: FaFacebookF,
		color: "#1877F3",
		shareUrl: (url: string) =>
			`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
		label: "Share on Facebook",
	},
	{
		name: "Instagram",
		Icon: FaInstagram,
		color: "#E4405F",
		shareUrl: (url: string) =>
			`https://www.instagram.com/?url=${encodeURIComponent(url)}`,
		label: "Share on Instagram",
	},
	{
		name: "WeChat",
		Icon: SiWechat,
		color: "#09BB07",
		shareUrl: (url: string) => url, // WeChat sharing is typically via QR, fallback to copy link
		label: "Share on WeChat",
	},
];

const MORE_ARTICLES = [
	{
		title: "Title Name Title Name Title Name Title Title Name Title Name Title",
		date: "31/12/2024",
		tags: ["Tag1", "Tag2"],
	},
	{
		title: "Title Name Title Name Title Name Title Title Name Title Name Title",
		date: "31/12/2024",
		tags: ["Tag1", "Tag2"],
	},
	{
		title: "Title Name Title Name Title Name Title Title Name Title Name Title",
		date: "31/12/2024",
		tags: ["Tag1", "Tag2"],
	},
];

const handleShare = (shareUrl: string, platform: string) => {
	if (platform === "WeChat") {
		// For WeChat, copy link to clipboard and show alert
		navigator.clipboard.writeText(window.location.href);
		alert("Link copied! Open WeChat and share the link.");
	} else {
		window.open(shareUrl, "_blank", "noopener,noreferrer");
	}
};

const Share: React.FC = () => {
	const url = typeof window !== "undefined" ? window.location.href : "";
	return (
		<div className="blog-share-container">
			{/* Share Row */}
			<div className="blog-share-row">
				<span className="blog-share-label">Share</span>
				<div className="blog-share-btns">
					{ICONS.map(({ name, Icon, color, shareUrl, label }) => (
						<button
							key={name}
							aria-label={label}
							title={label}
							tabIndex={0}
							className="blog-share-btn"
							onClick={() => handleShare(shareUrl(url), name)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									handleShare(shareUrl(url), name);
								}
							}}
							onMouseOver={(e) => {
								(e.currentTarget as HTMLElement).style.background = color;
								(e.currentTarget as HTMLElement).style.color = "#fff";
							}}
							onFocus={(e) => {
								(e.currentTarget as HTMLElement).style.background = color;
								(e.currentTarget as HTMLElement).style.color = "#fff";
							}}
							onMouseOut={(e) => {
								(e.currentTarget as HTMLElement).style.background = "#000";
								(e.currentTarget as HTMLElement).style.color = "#fff";
							}}
							onBlur={(e) => {
								(e.currentTarget as HTMLElement).style.background = "#000";
								(e.currentTarget as HTMLElement).style.color = "#fff";
							}}
						>
							<Icon size={20} />
						</button>
					))}
				</div>
			</div>
			{/* Divider Line */}
			<div className="blog-share-divider" />
			{/* More Articles Label */}
			<div className="blog-share-more-label">More Articles</div>
			{/* Article Cards */}
			<div className="blog-share-articles">
				{MORE_ARTICLES.map((article, idx) => (
					<div className="blog-card" key={idx}>
						{/* Image */}
						<div className="blog-card-image-container">
							<img
								src="/assets/blog/image_blog_detail_1.png"
								alt="Blog Card"
								className="blog-card-image"
								onError={(e) => {
									(e.target as HTMLImageElement).src =
										"https://via.placeholder.com/150x100?text=Blog+Image";
								}}
							/>
						</div>
						{/* Content */}
						<div className="blog-card-content">
							<span className="blog-card-date">{article.date}</span>
							<span className="blog-card-title">{article.title}</span>
						</div>
					</div>
				))}
			</div>
			{/* Divider Line */}
			<div className="blog-share-divider" />
		</div>
	);
};

export default Share;
