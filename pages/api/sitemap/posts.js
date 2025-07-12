import { SitemapStream, streamToPromise } from "sitemap";
import { sanityClient } from "@/utils/sanity";

const hostname = "https://raymond-ng.com";

export default async function handler(req, res) {
	const posts = await sanityClient.fetch(
		`*[_type == "post" && status == "published"]{ slug, updatedAt, publishedAt, canonicalUrl }`
	);
	res.setHeader("Content-Type", "application/xml");
	const stream = new SitemapStream({ hostname });
	posts.forEach((post) => {
		stream.write({
			url: post.canonicalUrl || `/blogs/${post.slug.current}`,
			lastmod: post.updatedAt || post.publishedAt,
			changefreq: 'weekly',
			priority: 0.7,
		});
	});
	stream.end();
	const xml = await streamToPromise(stream).then((data) => data.toString());
	res.status(200).send(xml);
}
