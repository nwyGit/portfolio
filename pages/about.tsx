import Layout from "@/components/v2/Layout";
import AboutSection from "@/components/v2/sections/AboutSection";
import { fetchAbout, fetchSkills } from "@/utils/fetchData";
import { GetStaticProps } from "next";
import { SEO } from "@/components/v2/shared/component/SEO";
import { About, Skill } from "@/components/v2/shared/type/types";
import { getPersonSchema } from "@/utils/schemaBlogPosting";

interface AboutProps {
	about: About;
	skills: Skill[];
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
	const about = await fetchAbout();
	const skills = await fetchSkills();

	return {
		props: { about, skills },
		revalidate: 60,
	};
};

export default function AboutPage({ about, skills }: AboutProps) {
	return (
		<Layout>
			<SEO
				title="About Raymond Ng"
				description="Learn more about Raymond Ng, his background, and his skills."
				canonical="https://raymond-ng.com/about"
				extraStructuredData={[
					getPersonSchema({
						name: "Raymond Ng",
						url: "https://raymond-ng.com/about",
					}),
				]}
			/>
			<main>
				<AboutSection about={about} skills={skills} />
			</main>
		</Layout>
	);
}
