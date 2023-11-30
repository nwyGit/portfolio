import { groq } from "next-sanity";
import { sanityClient } from "@/utils/sanity";

const query = groq`
  *[_type == "hero"][0] {
		greeting,
		name,
		slogan,
		description
	}
`;

export default async function handler(req, res) {
	const hero = await sanityClient.fetch(query);
	res.status(200).json(hero);
}
