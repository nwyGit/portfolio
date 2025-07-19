import { groq } from "next-sanity";
import { sanityClient } from "@/utils/sanity";
import { Hero, About, Skill, Project } from "@/components/v2/shared/type/types";

const dataFetcher = async <T>(query: string, defaultValue?: T): Promise<T> => {
	try {
		const data = await sanityClient.fetch<T>(query);
		if (!data && defaultValue !== undefined) {
			return defaultValue;
		}
		return data;
	} catch (error) {
		console.error('Error fetching data from Sanity:', error);
		console.error('Query:', query);
		if (defaultValue !== undefined) {
			return defaultValue;
		}
		throw new Error(`Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
};

export const fetchHero = async (): Promise<Hero | null> => {
	const query = groq`
		*[_type == "hero"][0] {
			greeting,
			name,
			slogan,
			description,
			skillDescription
		}
	`;

	try {
		return await dataFetcher<Hero>(query);
	} catch (error) {
		console.error('Failed to fetch hero data:', error);
		return null;
	}
};

export const fetchAbout = async (): Promise<About | null> => {
	const query = groq`
		*[_type == "about"][0] {
			paragraph1,
			paragraph2,
			"selfieURL": selfie.asset->url,
			"aboutMeImageURL": aboutMeImage.asset->url
		}
	`;

	try {
		return await dataFetcher<About>(query);
	} catch (error) {
		console.error('Failed to fetch about data:', error);
		return null;
	}
};

export const fetchSkills = async (): Promise<Skill[]> => {
	const query = groq`
		*[_type == "skill"]
	`;

	try {
		return await dataFetcher<Skill[]>(query, []);
	} catch (error) {
		console.error('Failed to fetch skills data:', error);
		return [];
	}
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

	try {
		return await dataFetcher<Project[]>(query, []);
	} catch (error) {
		console.error('Failed to fetch projects data:', error);
		return [];
	}
};

export const fetchResume = async (): Promise<{ resumeURL: string } | null> => {
	const query = groq`
		*[_type == "resume"][0] {
			"resumeURL": resume.asset->url
		}
	`;

	try {
		return await dataFetcher<{ resumeURL: string }>(query);
	} catch (error) {
		console.error('Failed to fetch resume data:', error);
		return null;
	}
};
