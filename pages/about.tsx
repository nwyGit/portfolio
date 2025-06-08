import Layout from "@/components/v2/Layout";
import AboutSection from "@/components/v2/sections/AboutSection";
import { fetchAbout, fetchSkills } from "@/utils/fetchData";
import { GetStaticProps } from "next";
import Head from "next/head";

interface AboutProps {
	about: any;
	skills: any;
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
	const about = await fetchAbout();
	const skills = await fetchSkills();

	return {
		props: { about, skills },
		revalidate: 60,
	};
};

export default function About({ about, skills }: AboutProps) {
	return (
		<Layout>
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
