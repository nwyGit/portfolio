import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

interface SEOProps {
	title?: string;
	description?: string;
	canonical?: string;
	image?: string;
	type?: string;
	datePublished?: string;
	dateModified?: string;
	schemaMarkup?: object;
	twitterCardType?: string;
	twitterSite?: string;
	twitterCreator?: string;
	extraMetaTags?: Array<{ name: string; content: string }>;
	extraStructuredData?: object[];
	keywords?: string;
	author?: string;
	url?: string;
	siteName?: string;
	locale?: string;
}

const defaultTitle = "Raymond Ng | Full Stack Developer & Data Analyst";
const defaultDescription = "Experienced Full Stack Developer specializing in React, Next.js, and data analytics. Explore my portfolio of web applications and data visualization projects.";
const defaultType = "website";
const defaultSiteName = "Raymond Ng Portfolio";
const defaultUrl = "https://raymond-ng.com";
const defaultTwitter = "@raymond_ng_dev";
const defaultLocale = "en_US";

export const SEO: React.FC<SEOProps> = ({
	title = defaultTitle,
	description = defaultDescription,
	canonical,
	image,
	type = defaultType,
	datePublished,
	dateModified,
	schemaMarkup,
	twitterCardType = "summary_large_image",
	twitterSite = defaultTwitter,
	twitterCreator = defaultTwitter,
	extraMetaTags = [],
	extraStructuredData = [],
	keywords,
	author = "Raymond Ng",
	url = defaultUrl,
	siteName = defaultSiteName,
	locale = defaultLocale,
}) => {
	return (
		<HelmetProvider>
			<Helmet>
				<title>{title}</title>
				<meta name="description" content={description} />
				{keywords && <meta name="keywords" content={keywords} />}
				<meta name="author" content={author} />
				{canonical && <link rel="canonical" href={canonical} />}
				
				{/* Open Graph tags */}
				<meta property="og:type" content={type} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:url" content={canonical || url} />
				<meta property="og:site_name" content={siteName} />
				<meta property="og:locale" content={locale} />
				{image && <meta property="og:image" content={image} />}
				{image && <meta property="og:image:alt" content={title} />}
				{datePublished && (
					<meta property="article:published_time" content={datePublished} />
				)}
				{dateModified && (
					<meta property="article:modified_time" content={dateModified} />
				)}
				{/* Twitter Card tags */}
				<meta name="twitter:card" content={twitterCardType} />
				<meta name="twitter:site" content={twitterSite} />
				<meta name="twitter:creator" content={twitterCreator} />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				{image && <meta name="twitter:image" content={image} />}
				{image && <meta name="twitter:image:alt" content={title} />}
				{/* Additional SEO meta tags */}
				<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
				<meta name="googlebot" content="index, follow" />
				
				{/* Extra meta tags */}
				{extraMetaTags.map((tag, i) => (
					<meta key={i} name={tag.name} content={tag.content} />
				))}
				{/* Structured Data */}
				{schemaMarkup && (
					<script type="application/ld+json">
						{JSON.stringify(schemaMarkup)}
					</script>
				)}
				{extraStructuredData.map((schema, i) => (
					<script key={i} type="application/ld+json">
						{JSON.stringify(schema)}
					</script>
				))}
			</Helmet>
		</HelmetProvider>
	);
};
