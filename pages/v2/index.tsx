import Layout from "@/components/v2/Layout";
import Landing from "@/components/v2/sections/LandingSection";
import { Hero, Project, Skill } from "@/components/v2/shared/types";
import {
	fetchHero,
	fetchProjects,
	fetchResume,
	fetchSkills,
} from "@/utils/fetchData";
import { GetStaticProps } from "next";
import Head from "next/head";
interface HomeProps {
	hero: Hero;
	skills: Skill[];
	projects: Project[];
	resumeURL: string;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const hero = await fetchHero();
	const skills = await fetchSkills();
	const projects = await fetchProjects();
	const resumeURL = await fetchResume();

	return {
		props: { hero, skills, projects, resumeURL },
		revalidate: 60,
	};
};

export default function Home({ hero, skills, resumeURL }: HomeProps) {
	return (
		<Layout resumeURL={resumeURL}>
			<Head>
				<title>Raymond Ng</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Landing hero={hero} skills={skills} />
			</main>
		</Layout>
	);
}
