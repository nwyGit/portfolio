import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/components/v2/shared/type/types";

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

	return (
		<section id="projects" className="project-section">
			<h2 className="project-section-title">Projects</h2>
			<div className="project-section-categories">
				{categories.map((cat) => (
					<button
						key={cat.id}
						onClick={() => setActive(cat.id)}
						className={`project-section-category-btn${active === cat.id ? " project-section-category-btn--active" : ""}`}
					>
						<span>{cat.label}</span>
						{active === cat.id && (
							<span className="project-section-category-underline" />
						)}
						{active !== cat.id && (
							<span className="project-section-category-underline project-section-category-underline--inactive" />
						)}
					</button>
				))}
			</div>
			{/* Project Cards Grid */}
			<div className="project-section-grid-wrapper">
				<div className="project-section-grid">
					{filteredProjects.map((project) => (
						<ProjectCard key={project._id} project={project} />
					))}
				</div>
			</div>
		</section>
	);
}
