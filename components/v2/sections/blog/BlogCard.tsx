import React from "react";
import DynamicButton from "@/components/v2/shared/component/DynamicButton";
import { RxArrowTopRight } from "react-icons/rx";
import { BlogPost } from "@/components/v2/shared/type/types";
import Image from "next/image";
import { useRouter } from "next/router";

interface BlogCardProps {
	post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
	const { title, summary, tags, publishedAt } = post;
	const router = useRouter();
	
	// Determine current language from router path
	const currentLanguage = router.asPath.startsWith('/zh') ? 'zh' : 'en';
	
	// Format date for display
	const formatDate = (dateString: string): string => {
		try {
			const date = new Date(dateString);
			const locale = currentLanguage === 'zh' ? 'zh-TW' : 'en-US';
			return date.toLocaleDateString(locale, {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		} catch {
			return dateString;
		}
	};
	return (
		<div className="flex flex-col lg:flex-row gap-6 lg:gap-10 bg-white rounded-2xl p-0 max-w-[1200px] w-full">
			{/* Image Section */}
			<div className="w-full lg:w-[500px] h-[250px] sm:h-[300px] lg:h-[333px] rounded-lg overflow-hidden shrink-0">
				{post.featuredImage?.asset?.url && (
					<Image
						src={post.featuredImage.asset.url}
						alt={post.featuredImage.alt || "Blog Detail"}
						width={500}
						height={333}
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
						className="w-full h-full object-cover"
						placeholder="blur"
						blurDataURL="/assets/blog/image_blog_detail_1.png"
						priority={false}
					/>
				)}
			</div>
			{/* Content Section */}
			<div className="flex flex-col gap-4 lg:gap-6 flex-1 justify-between px-4 lg:px-0 pb-4 lg:pb-0">
				<div className="flex flex-col gap-3">
					{/* Title */}
					<h3 className="font-ubuntu font-bold text-xl sm:text-2xl lg:text-[30px] leading-[1.15] text-black mb-1 break-words">
						{title}
					</h3>
					
					{/* Date */}
					<div className="font-ubuntu font-light text-sm lg:text-base leading-[1.15] text-gray-500 mb-2">
						{publishedAt ? formatDate(publishedAt) : ''}
					</div>
					
					{/* Tags */}
					<div className="flex flex-row gap-2 lg:gap-4 flex-wrap mb-2">
						{tags?.map((tag) => (
							<span
								key={typeof tag === 'string' ? tag : tag.name}
								className="inline-flex items-center justify-center gap-2 px-2 lg:px-[10px] py-1 lg:py-[5px] bg-black bg-opacity-5 rounded-[5px] font-red-hat-display font-normal text-sm lg:text-[15px] leading-[1.32] text-black"
							>
								{typeof tag === 'string' ? tag : tag.name}
							</span>
						))}
					</div>
					
					{/* Summary */}
					<p className="font-red-hat-display font-normal text-sm lg:text-base leading-[1.32] text-black mt-0">
						{summary || 'No summary available'}
					</p>
				</div>
				{/* Button */}
				<div className="w-fit">
					<DynamicButton
						text="view more"
						icon={<RxArrowTopRight size={24} />}
						href={`/${currentLanguage}/blogs/${typeof post.slug === 'string' ? post.slug : post.slug?.current}`}
						target="_blank"
						className="btn-black flex items-center gap-2 lg:gap-[10px] px-6 lg:px-[25px] lg:pl-[30px] py-3 lg:py-[12px] rounded-full border border-black bg-black text-white font-red-hat-display font-bold text-sm lg:text-base leading-[1.32] uppercase cursor-pointer transition-all duration-200 hover:bg-white hover:text-black mt-4"
						iconPosition="right"
					/>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
