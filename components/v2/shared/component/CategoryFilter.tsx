import React, { useRef, useEffect } from "react";

export interface Category {
	id: string;
	label: string;
}

interface CategoryFilterProps {
	categories: Category[];
	active: string;
	setActive: (id: string) => void;
	className?: string;
	btnClassName?: string;
	highlighterClassName?: string;
	withHighlighter?: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
	categories,
	active,
	setActive,
	className = "",
	btnClassName = "category-filter-btn",
	highlighterClassName = "category-filter-highlighter",
	withHighlighter = false,
}) => {
	const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const highlighterRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!withHighlighter) return;
		const idx = categories.findIndex((cat) => cat.id === active);
		const btn = btnRefs.current[idx];
		if (btn && btn.parentElement && highlighterRef.current) {
			const parentRect = btn.parentElement.getBoundingClientRect();
			const btnRect = btn.getBoundingClientRect();
			highlighterRef.current.style.left = btnRect.left - parentRect.left + "px";
			highlighterRef.current.style.width = btnRect.width + "px";
		}
	}, [active, categories, withHighlighter]);

	return (
		<div className={className} style={{ position: "relative" }}>
			{withHighlighter && (
				<span
					ref={highlighterRef}
					className={highlighterClassName}
					style={{ position: "absolute", transition: "left 0.2s, width 0.2s" }}
				/>
			)}
			{categories.map((cat, idx) => (
				<button
					key={cat.id}
					onClick={() => setActive(cat.id)}
					className={
						btnClassName + (active === cat.id ? ` ${btnClassName}--active` : "")
					}
					ref={(el) => {
						btnRefs.current[idx] = el;
					}}
				>
					<span>{cat.label}</span>
				</button>
			))}
		</div>
	);
};

export default CategoryFilter;
