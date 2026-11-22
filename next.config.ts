import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
	},
	async redirects() {
		return [
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

export default process.env.ANALYZE === 'true'
	? bundleAnalyzer({ enabled: true })(nextConfig)
	: nextConfig;
