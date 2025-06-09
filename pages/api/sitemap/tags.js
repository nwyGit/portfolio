import { SitemapStream, streamToPromise } from "sitemap";
import { sanityClient } from "@/utils/sanity";

const hostname = "https://raymond-ng.com";

export default async function handler(req, res) {
	const tags = await sanityClient.fetch(`*[_type == "tag"]{ slug }`);
	res.setHeader("Content-Type", "application/xml");
	const stream = new SitemapStream({ hostname });
	tags.forEach((tag) => {
		stream.write({ url: `/blogs/tags/${tag.slug.current}` });
	});
	stream.end();
	const xml = await streamToPromise(stream).then((data) => data.toString());
	res.status(200).send(xml);
}
