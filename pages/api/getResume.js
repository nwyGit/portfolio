import { groq } from "next-sanity";
import { sanityClient } from "@/utils/sanity";

const query = groq`
  *[_type == "resume"][0] {
    "resumeURL": resume.asset->url
  }
`;

export default async function handler(req, res) {
	const url = await sanityClient.fetch(query);
	const { resumeURL } = url;
	res.status(200).json(resumeURL);
}
