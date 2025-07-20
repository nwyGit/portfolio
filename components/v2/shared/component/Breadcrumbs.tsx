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

	// Split items for mobile two-row layout
	const firstRowItems = items.length > 1 ? items.slice(0, -1) : items;
	const lastItem = items.length > 1 ? items[items.length - 1] : null;

	// Render breadcrumb item helper function
	const renderBreadcrumbItem = (item: BreadcrumbItem, idx: number, isLastInRow: boolean = false) => (
		<React.Fragment key={item.name + idx}>
			<li
				className="flex items-center flex-shrink-0"
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
						<FaHome className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
						<span className="hidden sm:inline" itemProp="name">{item.name}</span>
					</Link>
				) : item.href ? (
					<Link
						href={item.href}
						style={{ color: "#8b8b8b" }}
						className="hover:text-black transition-colors whitespace-nowrap"
						itemProp="item"
					>
						<span className="max-w-[100px] sm:max-w-[200px] lg:max-w-none truncate" itemProp="name">{item.name}</span>
					</Link>
				) : (
					<span
						role="link"
						aria-disabled="true"
						aria-current="page"
						className="font-medium text-black max-w-[120px] sm:max-w-[250px] lg:max-w-none truncate"
						itemProp="name"
					>
						{item.name}
					</span>
				)}
				<meta itemProp="position" content={String(idx + 1)} />
			</li>
			{!isLastInRow && (
				<li
					aria-hidden="true"
					className="flex items-center flex-shrink-0 mx-1"
					style={{ color: "#8b8b8b" }}
				>
					<MdOutlineKeyboardArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
				</li>
			)}
		</React.Fragment>
	);

	return (
		<div
			className={`w-full border-b bg-white py-3 px-4 sm:px-0 ${className}`}
		>
			{/* Desktop Layout - Single Row */}
			<div className="hidden md:flex justify-between items-center gap-4">
				<nav aria-label="breadcrumb" className="min-w-0 flex-1">
					<ol
						className="flex items-center text-sm gap-2 overflow-x-auto whitespace-nowrap"
						itemScope
						itemType="https://schema.org/BreadcrumbList"
					>
						{items.map((item, idx) => renderBreadcrumbItem(item, idx, idx === items.length - 1))}
					</ol>
				</nav>
				
				{rightContent && (
					<div className="flex items-center flex-shrink-0">
						{rightContent}
					</div>
				)}
			</div>

			{/* Mobile Layout - Two Rows */}
			<div className="md:hidden">
				<nav aria-label="breadcrumb">
					<ol className="sr-only" itemScope itemType="https://schema.org/BreadcrumbList">
						{items.map((item, idx) => renderBreadcrumbItem(item, idx, idx === items.length - 1))}
					</ol>
					
					<div className="grid grid-cols-[1fr_auto] gap-4 items-center">
						{/* First Row - All items except last */}
						<div className="min-w-0">
							<div className="flex items-center text-xs gap-1 overflow-x-auto whitespace-nowrap">
								{firstRowItems.map((item, idx) => (
									<React.Fragment key={item.name + idx}>
										<div className="flex items-center flex-shrink-0">
											{idx === 0 ? (
												<Link
													href={item.href || "/"}
													className="inline-flex items-center hover:text-black transition-colors"
													style={{ color: "#8b8b8b" }}
												>
													<FaHome className="w-3 h-3 mr-1" />
													<span className="sr-only">{item.name}</span>
												</Link>
											) : item.href ? (
												<Link
													href={item.href}
													style={{ color: "#8b8b8b" }}
													className="hover:text-black transition-colors whitespace-nowrap"
												>
													<span className="max-w-[100px] truncate">{item.name}</span>
												</Link>
											) : (
												<span className="font-medium text-black max-w-[120px] truncate">
													{item.name}
												</span>
											)}
										</div>
										<div
											className="flex items-center flex-shrink-0 mx-1"
											style={{ color: "#8b8b8b" }}
										>
											<MdOutlineKeyboardArrowRight className="w-3 h-3" />
										</div>
									</React.Fragment>
								))}
							</div>
						</div>
						
						{/* Language Switch - Vertically Centered */}
						{rightContent && (
							<div className="flex items-center flex-shrink-0 row-span-2 self-center">
								{rightContent}
							</div>
						)}
						
						{/* Second Row - Last Item (Current Page) */}
						{lastItem && (
							<div className="min-w-0">
								<div className="flex items-center text-xs">
									{lastItem.href ? (
										<Link
											href={lastItem.href}
											style={{ color: "#8b8b8b" }}
											className="hover:text-black transition-colors whitespace-nowrap"
										>
											<span className="max-w-[200px] truncate">{lastItem.name}</span>
										</Link>
									) : (
										<span className="font-medium text-black max-w-[200px] truncate">
											{lastItem.name}
										</span>
									)}
								</div>
							</div>
						)}
					</div>
				</nav>
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
