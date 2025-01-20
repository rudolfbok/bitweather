import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['openweathermap.org'], // Add the required domain here
	},
};

export default nextConfig;
