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
};

export default withBundleAnalyzer(nextConfig);