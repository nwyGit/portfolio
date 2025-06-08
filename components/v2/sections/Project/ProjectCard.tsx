import { Project } from "@/components/v2/shared/type/types";
import Image from "next/image";
import { RxArrowTopRight } from "react-icons/rx";

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
		<div className="relative flex flex-col w-full max-w-full sm:max-w-[400px] md:max-w-[600px] min-h-[540px] holographic-card shadow-sm">
			{/* Project Image */}
			<div className="w-full h-[220px] md:h-[400px] relative z-10">
				<Image
					src={desktopImageURL || ""}
					alt={title}
					fill
					className="object-cover rounded-t-[10px]"
					priority
				/>
			</div>
			{/* Card Content */}
			<div className="bg-white/70 backdrop-blur-md shadow-lg w-full flex flex-col justify-between flex-1 gap-[30px] p-5 pt-6 rounded-b-[10px] h-full z-10">
				{/* Title & Description */}
				<div className="flex flex-col gap-2">
					<h3 className="font-ubuntu font-bold text-[28px] leading-[1.15] text-black uppercase">
						{title}
					</h3>
					<p className="font-redhat font-normal text-[16px] leading-[1.32] text-black line-clamp-5">
						{summary}
					</p>
				</div>
				{/* Tags */}
				<div className="flex flex-row flex-wrap gap-[10px]">
					{technologies?.map((tech) => (
						<span
							key={tech._id}
							className="bg-[rgba(0,0,0,0.05)] text-black font-redhat text-[15px] px-[10px] py-[5px] rounded-[5px]"
						>
							{tech.title}
						</span>
					))}
				</div>
				{/* Buttons */}
				<div className="flex flex-col md:flex-row items-start gap-[15px] mt-auto">
					{demoLink && (
						<a
							href={demoLink}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-[10px] bg-black text-white font-redhat font-bold text-[16px] uppercase px-[30px] py-[12px] rounded-[30px] border border-black hover:bg-white hover:text-black transition-colors duration-200"
						>
							View Project
							<RxArrowTopRight size={24} />
						</a>
					)}
					{githubLink && (
						<a
							href={githubLink}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-[10px] bg-white text-black font-redhat font-bold text-[16px] uppercase px-[25px] py-[12px] rounded-[30px] border border-black hover:bg-black hover:text-white transition-colors duration-200"
						>
							Github
							<RxArrowTopRight size={24} />
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
