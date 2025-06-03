import { FC } from "react";
import Layout from "./Layout";

interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	technologies: string[];
	// Add other fields from Sanity schema
}

interface ProjectsProps {
	projects: Project[];
}

const Projects: FC<ProjectsProps> = ({ projects }) => {
	return (
		<Layout resumeURL="/resume.pdf">
			<div className="container mx-auto px-8 py-24">
				<h1 className="text-4xl font-bold mb-8">Projects</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project) => (
						<div
							key={project.id}
							className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
						>
							<div className="h-48 bg-gray-200 rounded-md mb-4">
								{project.image && (
									<img
										src={project.image}
										alt={project.title}
										className="w-full h-full object-cover rounded-md"
									/>
								)}
							</div>
							<h2 className="text-xl font-semibold mb-2">{project.title}</h2>
							<p className="text-gray-600 mb-4">{project.description}</p>
							<div className="flex gap-2 flex-wrap">
								{project.technologies.map((tech) => (
									<span
										key={tech}
										className="px-3 py-1 bg-gray-100 rounded-full text-sm"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default Projects;
