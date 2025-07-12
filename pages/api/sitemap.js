const hostname = "https://raymond-ng.com";

const routes = [
	{ path: "/api/sitemap/static", name: "static" },
	{ path: "/api/sitemap/posts", name: "posts" },
	{ path: "/api/sitemap/categories", name: "categories" },
	{ path: "/api/sitemap/tags", name: "tags" },
];

export default async function handler(req, res) {
	res.setHeader("Content-Type", "application/xml");
	const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
	.map((r) => `<sitemap><loc>${hostname}${r.path}</loc></sitemap>`)
	.join("\n")}
</sitemapindex>`;
	res.status(200).send(sitemapIndex);
}
