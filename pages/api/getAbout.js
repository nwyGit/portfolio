import { groq } from "next-sanity";
import { sanityClient } from "@/utils/sanity";

const query = groq`
  *[_type == "about"][0] {
		paragraph1,
		paragraph2,
		"selfieURL": selfie.asset->url
	}
`;

export default async function handler(req, res) {
	const about = await sanityClient.fetch(query);
	res.status(200).json(about);
}
