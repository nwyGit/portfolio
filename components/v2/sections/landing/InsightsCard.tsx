import Image from "next/image";
import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface InsightsCardProps {
	title: string;
	date: string;
	tags: string[];
	image?: string;
	link?: string;
}

export default function InsightsCard({
	title,
	date,
	tags,
	image,
	link,
}: InsightsCardProps) {
	const CardContent = (
		<div className="project-card-v2 shadow-sm">
			{/* Project Image */}
			<div className="w-full h-[320px] relative z-10">
				<Image
					src={image || ""}
					alt={title}
					fill
					className="project-card-v2-img object-cover"
					priority
				/>
			</div>
			{/* Card Content */}
			<div className="project-card-v2-content gap-[10px] !h-[180px] !flex-none">
				<div className="flex flex-col">
					<span className="blog-card-date">{date}</span>
					<h3 className="font-ubuntu font-bold text-[18px] leading-[1.15] text-black uppercase">
						{title}
					</h3>
				</div>
				{/* Tags */}
				<div className="project-card-v2-tags insights-card-tags-hide-overflow">
					{tags &&
						tags.slice(0, 3).map((tag) => (
							<span key={tag} className="project-card-v2-tag">
								{tag}
							</span>
						))}
					{tags && tags.length > 3 && (
						<span className="project-card-v2-tag">+{tags.length - 3}</span>
					)}
				</div>
				{/* Buttons */}
				<div className="project-card-v2-btns">
					<div className="flex flex-row justify-end items-center gap-2">
						<span className="insights-card-link font-red-hat-display font-bold text-[16px] text-black no-underline">
							Read more
						</span>
						<MdOutlineKeyboardArrowRight className="text-black" />
					</div>
				</div>
			</div>
		</div>
	);

	if (link) {
		return (
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className="block group"
				style={{ textDecoration: "none" }}
			>
				{CardContent}
			</a>
		);
	}
	return CardContent;
}
