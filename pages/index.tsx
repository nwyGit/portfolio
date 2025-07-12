import Layout from "@/components/v2/Layout";
import LandingSection from "@/components/v2/sections/LandingSection";
import { Hero, Project, Skill } from "@/components/v2/shared/type/types";
import { fetchHero, fetchProjects, fetchSkills } from "@/utils/fetchData";
import { GetStaticProps } from "next";
import { SEO } from "@/components/v2/shared/component/SEO";
import { getOrganizationSchema, getWebSiteSchema, getPersonDetailedSchema } from "@/utils/schemaBlogPosting";

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
				extraStructuredData={[
					getOrganizationSchema({
						name: "Raymond Ng",
						url: "https://raymond-ng.com",
						logo: "https://raymond-ng.com/logo.png",
					}),
					getWebSiteSchema({
						name: "Raymond Ng Portfolio",
						url: "https://raymond-ng.com",
						description: "Full Stack Developer and Data Analyst portfolio showcasing web applications and data visualization projects",
					}),
					getPersonDetailedSchema({
						name: "Raymond Ng",
						url: "https://raymond-ng.com",
						image: "https://raymond-ng.com/raymond-ng-profile.jpg",
						jobTitle: "Full Stack Developer & Data Analyst",
						workLocation: "Remote / Toronto, ON",
						knowsAbout: ["React", "Next.js", "TypeScript", "Python", "Data Analytics", "Web Development"],
						sameAs: ["https://github.com/raymond-ng", "https://linkedin.com/in/raymond-ng"],
					}),
				]}
				// image="https://raymond-ng.com/og-image.jpg"
			/>
			<main>
				<LandingSection hero={hero} skills={skills} projects={projects} />
			</main>
		</Layout>
	);
}
