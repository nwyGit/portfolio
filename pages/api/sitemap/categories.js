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
		const categories = await sanityClient.fetch(
			`*[_type == "blogCategory"]{ slug }`
		);

		if (!Array.isArray(categories)) {
			throw new ApiErrorHandler('Invalid data format from CMS', 502, 'CMS_ERROR');
		}

		res.setHeader("Content-Type", "application/xml");
		res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600"); // Cache for 1 hour
		
		const stream = new SitemapStream({ hostname });
		
		categories.forEach((cat) => {
			if (!cat.slug?.current) {
				console.warn(`[Sitemap] Category missing slug:`, cat);
				return;
			}
			
			stream.write({ 
				url: `/blogs/categories/${cat.slug.current}`,
				changefreq: 'daily',
				priority: 0.6
			});
		});
		
		stream.end();
		const xml = await streamToPromise(stream).then((data) => data.toString());
		res.status(200).send(xml);
	} catch (error) {
		if (error.name === 'ApiErrorHandler') {
			throw error;
		}
		throw new ApiErrorHandler('Failed to generate categories sitemap', 502, 'SITEMAP_GENERATION_ERROR');
	}
}

export default withErrorHandling(handler);
