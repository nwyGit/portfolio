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
				{schemaMarkup && (
					<script type="application/ld+json">
						{JSON.stringify(schemaMarkup)}
					</script>
				)}
			</Helmet>
		</HelmetProvider>
	);
};
