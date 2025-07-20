import { BlogPost, BlogFAQ, Language } from "@/components/v2/shared/type/types";
import React from "react";
import Breadcrumbs, {
	BreadcrumbItem,
} from "../../shared/component/Breadcrumbs";
import Share from "./BlogShare";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "../../shared/component/PortableTextComponents";
import { localizeBlogPost, getLocalizedFAQs, getLocalizedMessages, formatDate } from "@/utils/languageUtils";
import { useLanguagePreference } from "@/utils/useLanguagePreference";
import BlogFAQSection from "../../shared/component/BlogFAQSection";
import { MdTranslate } from "react-icons/md";
import { useRouter } from "next/router";

interface BlogDetailProps {
	post: BlogPost;
	items: BreadcrumbItem[];
	language: Language;
	faqs?: BlogFAQ[];
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, items, language, faqs = [] }) => {
	const router = useRouter();
	const { setLanguage } = useLanguagePreference();
	const localizedPost = localizeBlogPost(post, language);
	const localizedFAQs = getLocalizedFAQs(faqs, language);
	const messages = getLocalizedMessages(language);
	const alternateLanguage = language === 'en' ? 'zh-Hant' : 'en';
	const alternateLanguageCode = language === 'en' ? 'zh' : 'en';
	
	// Handle language switch with preference persistence
	const handleLanguageSwitch = () => {
		// Update stored preference
		setLanguage(alternateLanguage);
		
		// Navigate to target language URL
		router.push(`/${alternateLanguageCode}/blogs/${localizedPost.slug.current}`);
	};
	
	// Language switch button for breadcrumbs
	const languageSwitchButton = (
		<button 
			onClick={handleLanguageSwitch}
			className="flex items-center gap-2 px-3 py-1.5 text-black hover:text-gray-600 transition-colors cursor-pointer"
		>
			<MdTranslate size={16} />
			<span className="text-sm">{messages.switchLanguage}</span>
		</button>
	);
	return (
		<section className="blog-detail-section">
			{/* Breadcrumb with language switch */}
			<Breadcrumbs items={items} rightContent={languageSwitchButton} />
			
			<div className="blog-detail-layout">
				<div className="blog-detail-main">

					{/* Featured image */}
					{localizedPost.featuredImage && (
						<div className="my-8">
							<Image 
								src={localizedPost.featuredImage.asset.url}
								alt={localizedPost.featuredImage.alt || localizedPost.title}
								width={800}
								height={400}
								className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
							/>
						</div>
					)}
					{/* Article header */}
				<header className="mb-8">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						{localizedPost.title}
					</h1>
					
					{localizedPost.summary && (
						<p className="text-xl text-gray-600 mb-6">
							{localizedPost.summary}
						</p>
					)}
					
					<div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
						<span>{messages.by} {localizedPost.author.name}</span>
						<span>•</span>
						<time dateTime={localizedPost.publishedAt}>
							{messages.publishedOn} {formatDate(localizedPost.publishedAt, language)}
						</time>
						{localizedPost.categories && localizedPost.categories.length > 0 && (
							<>
								<span>•</span>
								<div className="flex flex-wrap gap-1">
									{localizedPost.categories.map((category) => (
										<span 
											key={category._id} 
											className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
										>
											{language === 'en' ? category.name : (category.name_zh || category.name)}
										</span>
									))}
								</div>
							</>
						)}
					</div>
					
					{localizedPost.tags && localizedPost.tags.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{localizedPost.tags.map((tag) => (
								<span 
									key={typeof tag === 'string' ? tag : tag._id}
									className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
								>
									{typeof tag === 'string' ? tag : (language === 'en' ? tag.name : (tag.name_zh || tag.name))}
								</span>
							))}
						</div>
					)}
				</header>
					{/* Article content */}
					<article className="prose prose-lg max-w-none mb-12">
						<PortableText 
							value={localizedPost.content} 
							components={portableTextComponents}
						/>
					</article>

					{/* FAQ Section */}
					{localizedFAQs.length > 0 && (
						<BlogFAQSection faqs={localizedFAQs} language={language} />
					)}
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
