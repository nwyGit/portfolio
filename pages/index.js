import Head from "next/head";
import Introduction from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Projects from "@/components/Projects";
import Contact from "@/components/ContactMe";
import styles from "@/styles";
import {
	fetchAbout,
	fetchHero,
	fetchProjects,
	fetchResume,
	fetchSkills,
} from "@/utils/fetchData";
import Layout from "@/components/Layout";

export const getStaticProps = async () => {
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

export default function Home({ hero, about, skills, projects, resumeURL }) {
	return (
		<Layout resumeURL={resumeURL}>
			<Head>
				<title>Raymond Ng</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={`${styles.xPaddings} bg-[#002538]`}>
				<Introduction hero={hero} />
				<AboutMe about={about} skills={skills} />
				<Projects projects={projects} />
				<Contact />
			</main>
		</Layout>
	);
}
