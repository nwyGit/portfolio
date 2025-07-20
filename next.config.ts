import type { NextConfig } from 'next';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
	},
	// Bundle optimization settings
	async redirects() {
		return [
			// Redirect legacy blog routes to English localized versions
			{
				source: '/blogs',
				destination: '/en/blogs',
				permanent: true,
			},
			{
				source: '/blogs/:post',
				destination: '/en/blogs/:post',
				permanent: true,
			},
		];
	},
};

export default withBundleAnalyzer(nextConfig);