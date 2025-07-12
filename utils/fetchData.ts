import { groq } from "next-sanity";
import { sanityClient } from "@/utils/sanity";
import { Hero, About, Skill, Project } from "@/components/v2/shared/type/types";

const dataFetcher = async <T>(query: string): Promise<T> => {
	const data = await sanityClient.fetch<T>(query);
	return data;
};

export const fetchHero = async (): Promise<Hero> => {
	const query = groq`
		*[_type == "hero"][0] {
			greeting,
			name,
			slogan,
			description,
			skillDescription
		}
	`;

	return dataFetcher(query);
};

export const fetchAbout = async (): Promise<About> => {
	const query = groq`
		*[_type == "about"][0] {
			paragraph1,
			paragraph2,
			"selfieURL": selfie.asset->url,
			"aboutMeImageURL": aboutMeImage.asset->url
		}
	`;

	return dataFetcher(query);
};

export const fetchSkills = async (): Promise<Skill[]> => {
	const query = groq`
		*[_type == "skill"]
	`;

	return dataFetcher(query);
};

export const fetchProjects = async (): Promise<Project[]> => {
	const query = groq`
		*[_type == "project"] {
			title,
			summary,
			dateCompleted,
			order,
			githubLink,
			demoLink,
			"desktopImageURL": desktopImage.asset->url,
			"mobileImageURL": mobileImage.asset->url,
			category->,
			technologies[]->
		}
	`;

	return dataFetcher(query);
};

export const fetchResume = async (): Promise<{ resumeURL: string }> => {
	const query = groq`
		*[_type == "resume"][0] {
			"resumeURL": resume.asset->url
		}
	`;

	return dataFetcher(query);
};
