import { FC } from "react";
// import { getAbout } from "../lib/sanity/queries";
import About from "../components/v2/About";

interface AboutPageProps {
	about: any; // TODO: Add proper type from Sanity schema
}

const AboutPage: FC<AboutPageProps> = ({ about }) => {
	return <About about={about} />;
};

export async function getStaticProps() {
	// const about = await getAbout();
	const about = {
		profile: {
			name: "Raymond Ng",
			image: "",
			description:
				"Full Stack Developer passionate about creating beautiful and functional web applications. Specializing in React, TypeScript, and modern web technologies.",
			socialLinks: {
				github: "https://github.com/nwyGit",
				linkedin: "https://www.linkedin.com/in/raymond-wyng",
			},
		},
		skills: [
			"React",
			"TypeScript",
			"Node.js",
			"Next.js",
			"Tailwind CSS",
			"GraphQL",
		],
		experience: [
			{
				title: "Senior Developer",
				period: "2020 - Present",
				description:
					"Leading development of web applications using React and TypeScript.",
			},
			{
				title: "Full Stack Developer",
				period: "2018 - 2020",
				description:
					"Developed and maintained multiple web applications using modern technologies.",
			},
		],
	};

	return {
		props: {
			about,
		},
		revalidate: 60, // Revalidate every minute
	};
}

export default AboutPage;
