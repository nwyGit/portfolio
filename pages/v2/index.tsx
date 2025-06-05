import Layout from "@/components/v2/Layout";
import {
	fetchAbout,
	fetchHero,
	fetchProjects,
	fetchResume,
	fetchSkills,
} from "@/utils/fetchData";
import { GetStaticProps } from "next";
import Head from "next/head";

interface HomeProps {
	hero: any;
	about: any;
	skills: any;
	projects: any;
	resumeURL: string;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const hero = await fetchHero();
	const about = await fetchAbout();
	const skills = await fetchSkills();
	const projects = await fetchProjects();
	const resumeURL = await fetchResume();

	return {
		props: { hero, about, skills, projects, resumeURL },
		revalidate: 60,
	};
};

export default function Home({
	hero,
	about,
	skills,
	projects,
	resumeURL,
}: HomeProps) {
	return (
		<Layout resumeURL={resumeURL}>
			<Head>
				<title>Raymond Ng</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main></main>
		</Layout>
	);
}
