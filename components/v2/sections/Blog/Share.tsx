import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiWechat } from "react-icons/si";
import BlogCard from "./BlogCard";

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
		<div
			style={{ width: 320, display: "flex", flexDirection: "column", gap: 30 }}
		>
			{/* Share Row */}
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 30,
					width: "100%",
          paddingTop: 30,
				}}
			>
				<span
					style={{
						fontFamily: "Ubuntu, sans-serif",
						fontWeight: 500,
						fontSize: 20,
						lineHeight: 1.15,
						textTransform: "uppercase",
						color: "#000",
						letterSpacing: 0,
					}}
				>
					Share
				</span>
				<div style={{ display: "flex", flexDirection: "row", gap: 15 }}>
					{ICONS.map(({ name, Icon, color, shareUrl, label }) => (
						<button
							key={name}
							aria-label={label}
							title={label}
							tabIndex={0}
							style={{
								display: "inline-flex",
								alignItems: "center",
								justifyContent: "center",
								width: 36,
								height: 36,
								borderRadius: "50%",
								background: "#000",
								border: "none",
								cursor: "pointer",
								transition: "background 0.2s, color 0.2s",
								outline: "none",
								color: "#fff",
								fontSize: 20,
								position: "relative",
							}}
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
			<div
				style={{
					width: "100%",
					height: 1,
					background: "rgba(0,0,0,0.25)",
				}}
			/>
			{/* More Articles Label */}
			<div
				style={{
					fontFamily: "Ubuntu, sans-serif",
					fontWeight: 500,
					fontSize: 20,
					lineHeight: 1.15,
					color: "#000",
				}}
			>
				More Articles
			</div>
			{/* Article Cards */}
			<div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
				{MORE_ARTICLES.map((article, idx) => (
					<BlogCard key={idx} {...article} />
				))}
			</div>
			{/* Divider Line */}
			<div
				style={{
					width: "100%",
					height: 1,
					background: "rgba(0,0,0,0.25)",
				}}
			/>
		</div>
	);
};

export default Share;
