import Head from "next/head";
import { GetStaticProps } from "next";
import Introduction from "@/components/v1/Hero";
import AboutMe from "@/components/v1/AboutMe";
import Projects from "@/components/v1/Projects";
import Contact from "@/components/v1/ContactMe";
import styles from "@/styles";
import {
	fetchAbout,
	fetchHero,
	fetchProjects,
	fetchSkills,
} from "@/utils/fetchData";
import Layout from "@/components/v1/Layout";
import { Hero, About, Skill, Project } from "@/components/v2/shared/type/types";

interface HomeProps {
	hero: Hero | null;
	about: About | null;
	skills: Skill[];
	projects: Project[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const hero = await fetchHero();
	const about = await fetchAbout();
	const skills = await fetchSkills();
	const projects = await fetchProjects();

	return {
		props: { hero, about, skills, projects },
		revalidate: 60,
	};
};

export default function Home({ hero, about, skills, projects }: HomeProps) {
	return (
		<Layout>
			<Head>
				<title>Raymond Ng</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={`${styles.xPaddings} bg-[#002538] text-primary`}>
				<Introduction hero={hero} />
				<AboutMe about={about} skills={skills} />
				<Projects projects={projects} />
				<Contact />
			</main>
		</Layout>
	);
}