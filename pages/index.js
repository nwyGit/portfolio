import {
	fetchAbout,
	fetchHero,
	fetchProjects,
	fetchResume,
	fetchSkills,
} from "@/utils/fetchData";
import { useRouter } from "next/router";
import { useEffect } from "react";

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

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.push("/v1");
	}, [router]);

	return null;
}
