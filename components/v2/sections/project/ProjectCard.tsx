import { Project } from "@/components/v2/shared/type/types";
import Image from "next/image";
import { RxArrowTopRight } from "react-icons/rx";
import DynamicButton from "@/components/v2/shared/component/DynamicButton";

export default function ProjectCard({ project }: { project: Project }) {
	const {
		title,
		summary,
		technologies,
		githubLink,
		demoLink,
		desktopImageURL,
	} = project;

	return (
		<div className="project-card-v2">
			{/* Project Image */}
			<div className="project-card-v2-image">
				<Image
					src={desktopImageURL || ""}
					alt={title}
					fill
					className="project-card-v2-img"
					priority
				/>
			</div>
			{/* Card Content */}
			<div className="project-card-v2-content">
				{/* Title & Description */}
				<div className="flex flex-col gap-2">
					<h3 className="project-card-v2-title">{title}</h3>
					<p className="project-card-v2-summary">{summary}</p>
				</div>
				{/* Tags */}
				<div className="project-card-v2-tags">
					{technologies?.map((tech) => (
						<span key={tech._id} className="project-card-v2-tag">
							{tech.title}
						</span>
					))}
				</div>
				{/* Buttons */}
				<div className="project-card-v2-btns">
					{demoLink && (
						<DynamicButton
							text="View Project"
							icon={<RxArrowTopRight size={24} />}
							href={demoLink}
							target="_blank"
							rel="noopener noreferrer"
							className="btn-black"
							iconPosition="right"
						/>
					)}
					{githubLink && (
						<DynamicButton
							text="Github"
							icon={<RxArrowTopRight size={24} />}
							href={githubLink}
							target="_blank"
							rel="noopener noreferrer"
							className="btn-white"
							iconPosition="right"
						/>
					)}
				</div>
			</div>
		</div>
	);
}
