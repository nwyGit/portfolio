import Layout from "@/components/v2/Layout";
import LandingSection from "@/components/v2/sections/LandingSection";
import { Hero, Project, Skill } from "@/components/v2/shared/type/types";
import { fetchHero, fetchProjects, fetchSkills } from "@/utils/fetchData";
import { GetStaticProps } from "next";
import { SEO } from "@/components/v2/shared/component/SEO";

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
			<SEO
				title="Raymond Ng | Portfolio"
				description="Welcome to Raymond Ng's portfolio. Explore projects, skills, and more."
				canonical="https://raymond-ng.com"
				// image="https://raymond-ng.com/og-image.jpg"
			/>
			<main>
				<LandingSection hero={hero} skills={skills} projects={projects} />
			</main>
		</Layout>
	);
}
