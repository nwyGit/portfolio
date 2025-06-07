import Layout from "@/components/v2/Layout";
import AboutSection from "@/components/v2/sections/AboutSection";
import {
	fetchAbout,
	fetchResume,
	fetchSkills
} from "@/utils/fetchData";
import { GetStaticProps } from "next";
import Head from "next/head";

interface AboutProps {
	about: any;
	skills: any;
	resumeURL: string;
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
	const about = await fetchAbout();
	const skills = await fetchSkills();
	const resumeURL = await fetchResume();

	return {
		props: { about, skills, resumeURL },
		revalidate: 60,
	};
};

export default function About({ about, skills, resumeURL }: AboutProps) {
	return (
		<Layout resumeURL={resumeURL}>
			<Head>
				<title>Raymond Ng</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<AboutSection about={about} skills={skills} />
			</main>
		</Layout>
	);
}
