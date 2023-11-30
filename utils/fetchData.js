import { groq } from "next-sanity";
import { sanityClient } from "@/utils/sanity";

const dataFetcher = async (query) => {
	const data = await sanityClient.fetch(query);
	return data;
};

export const fetchHero = async () => {
	const query = groq`
		*[_type == "hero"][0] {
			greeting,
			name,
			slogan,
			description
		}
	`;

	return dataFetcher(query);
};

export const fetchAbout = async () => {
	const query = groq`
		*[_type == "about"][0] {
			paragraph1,
			paragraph2,
			"selfieURL": selfie.asset->url
		}
	`;

	return dataFetcher(query);
};

export const fetchSkills = async () => {
	const query = groq`
		*[_type == "skill"]
	`;

	return dataFetcher(query);
};

export const fetchProjects = async () => {
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

export const fetchResume = async () => {
	const query = groq`
		*[_type == "resume"][0] {
			"resumeURL": resume.asset->url
		}
	`;

	return dataFetcher(query);
};
