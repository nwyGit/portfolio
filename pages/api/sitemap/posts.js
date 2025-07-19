import { SitemapStream, streamToPromise } from "sitemap";
import { sanityClient } from "@/utils/sanity";
import { withErrorHandling, validateMethod, ApiErrorHandler } from '@/utils/apiHelpers';

const hostname = "https://raymond-ng.com";

async function handler(req, res) {
	validateMethod(req, res, ['GET']);
	
	if (!hostname) {
		throw new ApiErrorHandler('Hostname not configured', 500, 'CONFIG_ERROR');
	}

	try {
		const posts = await sanityClient.fetch(
			`*[_type == "post" && status == "published"]{ slug, updatedAt, publishedAt, canonicalUrl }`
		);

		if (!Array.isArray(posts)) {
			throw new ApiErrorHandler('Invalid data format from CMS', 502, 'CMS_ERROR');
		}

		res.setHeader("Content-Type", "application/xml");
		res.setHeader("Cache-Control", "public, max-age=1800, s-maxage=1800"); // Cache for 30 minutes
		
		const stream = new SitemapStream({ hostname });
		
		posts.forEach((post) => {
			if (!post.slug?.current) {
				console.warn(`[Sitemap] Post missing slug:`, post);
				return;
			}
			
			stream.write({
				url: post.canonicalUrl || `/blogs/${post.slug.current}`,
				lastmod: post.updatedAt || post.publishedAt || new Date().toISOString(),
				changefreq: 'weekly',
				priority: 0.7,
			});
		});
		
		stream.end();
		const xml = await streamToPromise(stream).then((data) => data.toString());
		res.status(200).send(xml);
	} catch (error) {
		if (error.name === 'ApiErrorHandler') {
			throw error;
		}
		throw new ApiErrorHandler('Failed to generate posts sitemap', 502, 'SITEMAP_GENERATION_ERROR');
	}
}

export default withErrorHandling(handler);
