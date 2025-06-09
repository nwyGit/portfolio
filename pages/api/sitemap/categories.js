import { SitemapStream, streamToPromise } from "sitemap";
import { sanityClient } from "@/utils/sanity";

const hostname = "https://raymond-ng.com";

export default async function handler(req, res) {
	const categories = await sanityClient.fetch(
		`*[_type == "blogCategory"]{ slug }`
	);
	res.setHeader("Content-Type", "application/xml");
	const stream = new SitemapStream({ hostname });
	categories.forEach((cat) => {
		stream.write({ url: `/blogs/categories/${cat.slug.current}` });
	});
	stream.end();
	const xml = await streamToPromise(stream).then((data) => data.toString());
	res.status(200).send(xml);
}
