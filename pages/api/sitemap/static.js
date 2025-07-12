const hostname = "https://raymond-ng.com";

// Static pages with their priorities and change frequencies
const staticPages = [
	{
		url: "/",
		changefreq: "weekly",
		priority: 1.0,
		lastmod: new Date().toISOString(),
	},
	{
		url: "/about",
		changefreq: "monthly",
		priority: 0.8,
		lastmod: new Date().toISOString(),
	},
	{
		url: "/blogs",
		changefreq: "daily",
		priority: 0.9,
		lastmod: new Date().toISOString(),
	},
	{
		url: "/v1",
		changefreq: "yearly",
		priority: 0.3,
		lastmod: new Date().toISOString(),
	},
];

export default async function handler(req, res) {
	res.setHeader("Content-Type", "application/xml");
	
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
	.map(
		(page) => `  <url>
    <loc>${hostname}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join("\n")}
</urlset>`;

	res.status(200).send(sitemap);
}