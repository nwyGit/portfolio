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
			className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-black hover:text-gray-600 transition-colors cursor-pointer rounded-md hover:bg-gray-50 flex-shrink-0"
		>
			<MdTranslate className="w-4 h-4" />
			<span className="text-sm whitespace-nowrap">{messages.switchLanguage}</span>
		</button>
	);
	return (
		<section className="pt-[130px] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 w-full bg-white">
			{/* Breadcrumb with language switch */}
			<Breadcrumbs items={items} rightContent={languageSwitchButton} />
			
			{/* Responsive Layout Container */}
			<div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-8 mt-6">
				{/* Main Article Content */}
				<div className="flex-1 lg:flex-[0_1_70%]">

					{/* Featured image */}
					{localizedPost.featuredImage && (
						<div className="my-6 lg:my-8">
							<Image 
								src={localizedPost.featuredImage.asset.url}
								alt={localizedPost.featuredImage.alt || localizedPost.title}
								width={800}
								height={400}
								className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
								sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 800px"
							/>
						</div>
					)}
					
					{/* Article header */}
					<header className="mb-6 lg:mb-8">
						<h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 lg:mb-4 leading-tight">
							{localizedPost.title}
						</h1>
						
						{localizedPost.summary && (
							<p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4 lg:mb-6 leading-relaxed">
								{localizedPost.summary}
							</p>
						)}
						
						<div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4 lg:mb-6">
							<span>{messages.by} {localizedPost.author.name}</span>
							<span className="hidden sm:inline">•</span>
							<time dateTime={localizedPost.publishedAt}>
								{messages.publishedOn} {formatDate(localizedPost.publishedAt, language)}
							</time>
							{localizedPost.categories && localizedPost.categories.length > 0 && (
								<>
									<span className="hidden sm:inline">•</span>
									<div className="flex flex-wrap gap-1 sm:gap-2">
										{localizedPost.categories.map((category) => (
											<span 
												key={category._id} 
												className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm"
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
										className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
									>
										{typeof tag === 'string' ? tag : (language === 'en' ? tag.name : (tag.name_zh || tag.name))}
									</span>
								))}
							</div>
						)}
					</header>
					
					{/* Article content */}
					<article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mb-8 lg:mb-12">
						<PortableText 
							value={localizedPost.content} 
							components={portableTextComponents}
						/>
					</article>

					{/* FAQ Section */}
					{localizedFAQs.length > 0 && (
						<BlogFAQSection faqs={localizedFAQs} language={language} />
					)}
					
					{/* Share Section - Mobile: Bottom of article */}
					<div className="lg:hidden mt-8">
						<Share />
					</div>
				</div>
				
				{/* Share Section - Desktop: Sidebar */}
				<div className="hidden lg:block lg:flex-[0_1_28%] lg:sticky lg:top-24 lg:self-start">
					<Share />
				</div>
			</div>
		</section>
	);
};

export default BlogDetail;
