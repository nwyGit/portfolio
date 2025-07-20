import React, { useMemo, useState } from "react";
import BlogCard from "@/components/v2/sections/blog/BlogCard";
import CategoryFilter, {
	Category,
} from "@/components/v2/shared/component/CategoryFilter";
import { BlogPost } from "@/components/v2/shared/type/types";
import { useLanguagePreference } from "@/utils/useLanguagePreference";
import { useRouter } from "next/router";
import { MdTranslate } from "react-icons/md";

interface PortableTextChild {
	_type?: string;
	text?: string;
	marks?: string[];
}

interface BlogsProps {
	blogs: BlogPost[];
}

const BlogSection: React.FC<BlogsProps> = ({ blogs }) => {
	const [active, setActive] = useState("all");
	const [search, setSearch] = useState("");
	const router = useRouter();
	const { setLanguage } = useLanguagePreference();
	
	// Determine current language from router path
	const currentLanguage = router.asPath.startsWith('/zh') ? 'zh' : 'en';
	
	// Handle language switch with preference persistence
	const handleLanguageSwitch = (targetLanguage: 'en' | 'zh-Hant') => {
		// Update stored preference
		setLanguage(targetLanguage);
		
		// Navigate to target language URL
		const targetLangCode = targetLanguage === 'zh-Hant' ? 'zh' : 'en';
		router.push(`/${targetLangCode}/blogs`);
	};

	const categories: Category[] = useMemo(() => {
		const tagSet = new Set<string>();
		blogs.forEach((blog) => {
			blog.tags?.forEach((tag) => {
				// Use localized tag name
				const tagName = typeof tag === "string" ? tag : 
					(currentLanguage === 'zh' ? (tag.name_zh || tag.name) : tag.name);
				tagSet.add(tagName);
			});
		});
		return [
			{ id: "all", label: currentLanguage === 'zh' ? "全部" : "All" },
			...Array.from(tagSet).map((tag) => ({ id: tag, label: tag })),
		];
	}, [blogs, currentLanguage]);

	const filteredBlogs = useMemo(() => {
		const byCategory =
			active === "all"
				? blogs
				: blogs.filter((blog) =>
						blog.tags?.some((tag) => {
							// Use localized tag name for filtering
							const tagName = typeof tag === "string" ? tag : 
								(currentLanguage === 'zh' ? (tag.name_zh || tag.name) : tag.name);
							return tagName === active;
						})
					);
		if (!search.trim()) return byCategory;
		return byCategory.filter((blog) => {
			const contentText =
				blog.content
					?.map((block) => {
						if (block._type === "block" && block.children) {
							return block.children
								.map((child) => (child as PortableTextChild).text || "")
								.join("");
						}
						return "";
					})
					.join(" ") || "";

			return (
				blog.title.toLowerCase().includes(search.toLowerCase()) ||
				contentText.toLowerCase().includes(search.toLowerCase())
			);
		});
	}, [blogs, active, search, currentLanguage]);

	// Language switch button with same styling as BlogDetail
	const alternateLanguage = currentLanguage === 'zh' ? 'en' : 'zh-Hant';
	const languageSwitchText = currentLanguage === 'zh' ? 'English' : '中文版';
	
	return (
		<section className="pt-[130px]">
			{/* Header Section - Responsive Layout */}
			<div className="max-w-[1200px] mx-auto px-5 mb-6">
				{/* Desktop Layout */}
				<div className="hidden md:flex justify-between items-center">
					{/* Left: Title */}
					<h2 className="project-section-title m-0">
						{currentLanguage === 'zh' ? '部落格' : 'Blogs'}
					</h2>
					
					{/* Right: Search + Language Switch */}
					<div className="flex items-center gap-4">
						<input
							type="text"
							placeholder={currentLanguage === 'zh' ? "搜尋部落格..." : "Search blogs..."}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-80 p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						<button 
							onClick={() => handleLanguageSwitch(alternateLanguage)}
							className="flex items-center gap-2 px-3 py-1.5 text-black hover:text-gray-600 transition-colors cursor-pointer whitespace-nowrap"
						>
							<MdTranslate size={16} />
							<span className="text-sm">{languageSwitchText}</span>
						</button>
					</div>
				</div>

				{/* Mobile Layout */}
				<div className="md:hidden flex flex-col gap-4">
					{/* Title */}
					<h2 className="project-section-title m-0 text-center">
						{currentLanguage === 'zh' ? '部落格' : 'Blogs'}
					</h2>
					
					{/* Search Input - Full Width */}
					<input
						type="text"
						placeholder={currentLanguage === 'zh' ? "搜尋部落格..." : "Search blogs..."}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
					
					{/* Language Switch - Centered */}
					<div className="flex justify-center">
						<button 
							onClick={() => handleLanguageSwitch(alternateLanguage)}
							className="flex items-center gap-2 px-4 py-2 text-black hover:text-gray-600 transition-colors cursor-pointer"
						>
							<MdTranslate size={16} />
							<span className="text-sm">{languageSwitchText}</span>
						</button>
					</div>
				</div>
			</div>

			{/* Category Filter - Mobile Responsive */}
			<div className="flex justify-center my-5 px-4">
				<div className="w-full max-w-4xl overflow-x-auto">
					<CategoryFilter
						categories={categories}
						active={active}
						setActive={setActive}
						className="project-section-categories flex justify-center min-w-max px-2"
						btnClassName="category-filter-btn"
						btnActiveClassName="category-filter-btn--active"
						highlighterClassName="category-filter-highlighter"
						withHighlighter
					/>
				</div>
			</div>
			
			{/* Blog Cards Container */}
			<div className="flex flex-col items-center gap-8 lg:gap-[60px] py-10 w-full bg-white px-4">
				{filteredBlogs.map((blog, i) => (
					<BlogCard key={i} post={blog} />
				))}
			</div>
		</section>
	);
};

export default BlogSection;
