import { FC } from "react";
// import { getProjects } from "../lib/sanity/queries";
import Projects from "../components/v2/Projects";

interface ProjectsPageProps {
	projects: any[]; // TODO: Add proper type from Sanity schema
}

const ProjectsPage: FC<ProjectsPageProps> = ({ projects }) => {
	return <Projects projects={projects} />;
};

export async function getStaticProps() {
	// const projects = await getProjects();
	const projects = [
		{
			id: "1",
			title: "Project 1",
			description: "A sample project description",
			image: "",
			technologies: ["React", "TypeScript", "Tailwind"],
		},
		{
			id: "2",
			title: "Project 2",
			description: "Another sample project description",
			image: "",
			technologies: ["Next.js", "Node.js", "MongoDB"],
		},
		{
			id: "3",
			title: "Project 3",
			description: "Yet another sample project description",
			image: "",
			technologies: ["React", "GraphQL", "PostgreSQL"],
		},
	];

	return {
		props: {
			projects,
		},
		revalidate: 60, // Revalidate every minute
	};
}

export default ProjectsPage;
