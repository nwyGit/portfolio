import { withErrorHandling, validateMethod } from '@/utils/apiHelpers';

const hostname = "https://raymond-ng.com";

const routes = [
	{ path: "/api/sitemap/static", name: "static" },
	{ path: "/api/sitemap/posts", name: "posts" },
	{ path: "/api/sitemap/categories", name: "categories" },
	{ path: "/api/sitemap/tags", name: "tags" },
];

async function handler(req, res) {
	validateMethod(req, res, ['GET']);
	
	if (!hostname) {
		throw new Error('Hostname not configured');
	}

	res.setHeader("Content-Type", "application/xml");
	res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600"); // Cache for 1 hour
	
	const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
	.map((r) => `<sitemap><loc>${hostname}${r.path}</loc></sitemap>`)
	.join("\n")}
</sitemapindex>`;
	
	res.status(200).send(sitemapIndex);
}

export default withErrorHandling(handler);
