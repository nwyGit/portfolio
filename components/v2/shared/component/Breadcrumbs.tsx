import React from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export interface BreadcrumbItem {
	name: string;
	href?: string;
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
	className?: string;
	rightContent?: React.ReactNode;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = "", rightContent }) => {
	// Schema.org BreadcrumbList
	const schemaItems = items.map((item, idx) => ({
		"@type": "ListItem",
		position: idx + 1,
		name: item.name,
		item: item.href ? `${item.href}` : undefined,
	}));

	return (
		<div
			className={`sticky top-[64px] z-10 w-full border-b bg-white py-3 transition-all duration-300 translate-y-0 ${className}`}
		>
			<div className="flex justify-between items-center">
				<nav aria-label="breadcrumb">
					<ol
						className="flex items-center text-sm gap-2"
						itemScope
						itemType="https://schema.org/BreadcrumbList"
					>
					{items.map((item, idx) => (
						<React.Fragment key={item.name + idx}>
							<li
								className="flex items-center"
								itemProp="itemListElement"
								itemScope
								itemType="https://schema.org/ListItem"
							>
								{idx === 0 ? (
									<Link
										href={item.href || "/"}
										className="inline-flex items-center hover:text-black transition-colors"
										style={{ color: "#8b8b8b" }}
										itemProp="item"
									>
										<FaHome style={{ width: 16, height: 16, marginRight: 8 }} />
										<span itemProp="name">{item.name}</span>
									</Link>
								) : item.href ? (
									<Link
										href={item.href}
										style={{ color: "#8b8b8b" }}
										className="hover:text-black transition-colors"
										itemProp="item"
									>
										<span itemProp="name">{item.name}</span>
									</Link>
								) : (
									<span
										role="link"
										aria-disabled="true"
										aria-current="page"
										className="line-clamp-1 font-medium text-black"
										itemProp="name"
									>
										{item.name}
									</span>
								)}
								<meta itemProp="position" content={String(idx + 1)} />
							</li>
							{idx < items.length - 1 && (
								<li
									aria-hidden="true"
									className="flex items-center"
									style={{ color: "#8b8b8b" }}
								>
									<MdOutlineKeyboardArrowRight />
								</li>
							)}
						</React.Fragment>
					))}
					</ol>
				</nav>
				
				{rightContent && (
					<div className="flex items-center">
						{rightContent}
					</div>
				)}
			</div>
			{/* JSON-LD for BreadcrumbList schema */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BreadcrumbList",
						itemListElement: schemaItems,
					}),
				}}
			/>
		</div>
	);
};

export default Breadcrumbs;
