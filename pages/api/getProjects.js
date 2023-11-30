import { groq } from "next-sanity";
import { sanityClient } from "@/utils/sanity";

const query = groq`
  *[_type == "project"] {
		title,
		summary,
		dateCompleted,
		githubLink,
		demoLink,
		"desktopImageURL": desktopImage.asset->url,
		"mobileImageURL": mobileImage.asset->url,
		category->,
		technologies[]->
	}
`;

export default async function handler(req, res) {
	const projects = await sanityClient.fetch(query);
	res.status(200).json(projects);
}
