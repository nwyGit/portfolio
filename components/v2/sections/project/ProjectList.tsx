import CategoryFilter from "@/components/v2/shared/component/CategoryFilter";
import { Project } from "@/components/v2/shared/type/types";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import ProjectCard from "@/components/v2/sections/project/ProjectCard";

const categories = [
	{ id: "all", label: "All" },
	{ id: "Software Development", label: "Software Development" },
	{ id: "Data Analytics", label: "Data Analytics" },
];

interface ProjectListSectionProps {
	projects: Project[];
}

export default function ProjectListSection({
	projects,
}: ProjectListSectionProps) {
	const [active, setActive] = useState("all");
	const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const [, setHighlighterStyle] = useState({
		left: 0,
		width: 0,
	});
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () =>
			setIsMobile(window.matchMedia("(max-width: 640px)").matches);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useLayoutEffect(() => {
		const idx = categories.findIndex((cat) => cat.id === active);
		const btn = btnRefs.current[idx];
		if (btn && btn.parentElement) {
			const parentRect = btn.parentElement.getBoundingClientRect();
			const btnRect = btn.getBoundingClientRect();
			setHighlighterStyle({
				left: btnRect.left - parentRect.left,
				width: btnRect.width,
			});
		}
	}, [active]);

	const filteredProjects =
		active === "all"
			? [...projects].sort((a, b) => {
					const aCat = a.category?.name;
					const bCat = b.category?.name;
					if (aCat !== bCat) {
						if (aCat === "Software Development") return -1;
						if (bCat === "Software Development") return 1;
						return 0;
					}
					// If same category, sort by order descending
					return (b.order ?? 0) - (a.order ?? 0);
				})
			: projects
					.filter((project) => project.category?.name === active)
					.sort((a, b) => (b.order ?? 0) - (a.order ?? 0));

	const visibleCategories = isMobile ? [] : categories;

	// On mobile, always show all projects
	const projectsToShow = isMobile
		? [...projects].sort((a, b) => {
				const aCat = a.category?.name;
				const bCat = b.category?.name;
				if (aCat !== bCat) {
					if (aCat === "Software Development") return -1;
					if (bCat === "Software Development") return 1;
					return 0;
				}
				return (b.order ?? 0) - (a.order ?? 0);
			})
		: filteredProjects;

	return (
		<section id="projects" className="project-section">
			<h2 className="project-section-title">Projects</h2>
			{visibleCategories.length > 0 && (
				<div className="project-section-categories">
					<CategoryFilter
						categories={visibleCategories}
						active={active}
						setActive={setActive}
						className="project-section-categories"
						btnClassName="category-filter-btn"
						btnActiveClassName="category-filter-btn--active"
						highlighterClassName="category-filter-highlighter"
						withHighlighter
					/>
				</div>
			)}
			{/* Project Cards Grid */}
			<div className="project-section-grid-wrapper">
				<div className="project-section-grid">
					{projectsToShow.map((project, i) => (
						<ProjectCard key={i} project={project} />
					))}
				</div>
			</div>
		</section>
	);
}
