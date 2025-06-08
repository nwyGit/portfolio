import Layout from "@/components/v2/Layout";
import LandingSection from "@/components/v2/sections/LandingSection";
import ProjectSection from "@/components/v2/sections/ProjectSection";
import { Hero, Project, Skill } from "@/components/v2/shared/type/types";
import { fetchHero, fetchProjects, fetchSkills } from "@/utils/fetchData";
import { GetStaticProps } from "next";
import Head from "next/head";
interface HomeProps {
	hero: Hero;
	skills: Skill[];
	projects: Project[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const hero = await fetchHero();
	const skills = await fetchSkills();
	const projects = await fetchProjects();

	return {
		props: { hero, skills, projects },
		revalidate: 60,
	};
};

export default function Home({ hero, skills, projects }: HomeProps) {
	return (
		<Layout>
			<Head>
				<title>Raymond Ng</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<LandingSection hero={hero} skills={skills} projects={projects} />
			</main>
		</Layout>
	);
}
