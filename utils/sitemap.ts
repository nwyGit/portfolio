import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

export async function generateSitemap(
	urls: { url: string; lastmod?: string }[],
	hostname: string,
	outputPath: string
) {
	const sitemap = new SitemapStream({ hostname });
	const writeStream = createWriteStream(outputPath);
	sitemap.pipe(writeStream);
	urls.forEach(({ url, lastmod }) => {
		sitemap.write({ url, lastmod });
	});
	sitemap.end();
	await streamToPromise(sitemap);
}
