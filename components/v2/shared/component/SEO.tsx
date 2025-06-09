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
}

const defaultTitle = "My Website";
const defaultDescription = "Welcome to my website.";
const defaultType = "website";

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
	twitterSite,
	twitterCreator,
	extraMetaTags = [],
	extraStructuredData = [],
}) => {
	return (
		<HelmetProvider>
			<Helmet>
				<title>{title}</title>
				<meta name="description" content={description} />
				{canonical && <link rel="canonical" href={canonical} />}
				{image && <meta property="og:image" content={image} />}
				<meta property="og:type" content={type} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				{datePublished && (
					<meta property="article:published_time" content={datePublished} />
				)}
				{dateModified && (
					<meta property="article:modified_time" content={dateModified} />
				)}
				{/* Twitter Card tags */}
				<meta name="twitter:card" content={twitterCardType} />
				{twitterSite && <meta name="twitter:site" content={twitterSite} />}
				{twitterCreator && (
					<meta name="twitter:creator" content={twitterCreator} />
				)}
				{image && <meta name="twitter:image" content={image} />}
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
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
