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
		<section
			id="projects"
			className="w-full flex flex-col items-center gap-[24px] sm:gap-[30px] md:gap-[40px] pt-12 pb-8 px-[20px]"
			style={{ scrollMarginTop: "100px" }}
		>
			<h2 className="font-ubuntu font-bold text-[32px] sm:text-[38px] md:text-[46px] xl:text-[50px] leading-[1.15] text-black text-center mb-0 uppercase">
				Projects
			</h2>
			<div className="flex flex-row justify-center gap-[24px] sm:gap-[40px] md:gap-[60px] w-full">
				{categories.map((cat) => (
					<button
						key={cat.id}
						onClick={() => setActive(cat.id)}
						className={`flex flex-col items-center font-redhat text-[15px] sm:text-[16px] md:text-[18px] uppercase transition-colors duration-150
							${active === cat.id ? "font-bold text-black" : "font-normal text-black/50"}
							hover:text-black/80`}
						style={{ outline: "none" }}
					>
						<span>{cat.label}</span>
						{active === cat.id && (
							<span
								className={`block w-full h-[2px] bg-black rounded-full mt-[5px] origin-center transform transition-transform duration-300 ${active === cat.id ? "scale-x-100" : "scale-x-0"}`}
							/>
						)}
					</button>
				))}
			</div>
			{/* Project Cards Grid */}
			<div className="w-full flex justify-center">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] sm:gap-[30px] md:gap-[40px] max-w-[1280px] w-full mx-auto justify-items-center">
					{filteredProjects.map((project) => (
						<ProjectCard key={project._id} project={project} />
					))}
				</div>
			</div>
		</section>
	);
}
