import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiWechat } from "react-icons/si";
import Image from "next/image";
import { BlogPost, Language } from "@/components/v2/shared/type/types";
import { localizeBlogPost, getLocalizedMessages, formatDate } from "@/utils/languageUtils";
import Link from "next/link";

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

interface BlogShareProps {
	relatedArticles?: BlogPost[];
	language?: Language;
}

const handleShare = (shareUrl: string, platform: string) => {
	if (platform === "WeChat") {
		// For WeChat, copy link to clipboard and show alert
		navigator.clipboard.writeText(window.location.href);
		alert("Link copied! Open WeChat and share the link.");
	} else {
		window.open(shareUrl, "_blank", "noopener,noreferrer");
	}
};

const BlogShare: React.FC<BlogShareProps> = ({ relatedArticles = [], language = 'en' }) => {
	const url = typeof window !== "undefined" ? window.location.href : "";
	const messages = getLocalizedMessages(language);
	
	// Don't render the "More Articles" section if no related articles
	const hasRelatedArticles = relatedArticles && relatedArticles.length > 0;
	
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
			{/* Related Articles Section - Only show if articles exist */}
			{hasRelatedArticles && (
				<>
					{/* Divider Line - Desktop only */}
					<div className="blog-share-divider hidden lg:block" />
					{/* More Articles Label */}
					<div className="blog-share-more-label">
						{language === 'zh' ? '相關文章' : 'More Articles'}
					</div>
					{/* Article Cards */}
					<div className="blog-share-articles">
						{relatedArticles.map((article) => {
							const localizedArticle = localizeBlogPost(article, language);
							const articleUrl = `/${language === 'zh' ? 'zh' : 'en'}/blogs/${localizedArticle.slug.current}`;
							
							return (
								<Link href={articleUrl} key={article._id} className="block">
									<div className="blog-card hover:shadow-md transition-shadow duration-200 cursor-pointer">
										{/* Image */}
										<div className="blog-card-image-container">
											<Image
												src={localizedArticle.featuredImage?.asset?.url || "/assets/placeholder-image.jpg"}
												alt={localizedArticle.featuredImage?.alt || localizedArticle.title}
												width={150}
												height={100}
												sizes="(max-width: 150px) 100vw, 150px"
												className="w-full h-full object-cover"
												priority={false}
											/>
										</div>
										{/* Content */}
										<div className="blog-card-content">
											<span className="blog-card-date">
												{formatDate(localizedArticle.publishedAt, language)}
											</span>
											<span className="blog-card-title" title={localizedArticle.title}>
												{localizedArticle.title}
											</span>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
					{/* Divider Line - Desktop only */}
					<div className="blog-share-divider hidden lg:block" />
				</>
			)}
		</div>
	);
};

export default BlogShare;
