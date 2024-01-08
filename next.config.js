/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		swcPlugins: [['next-superjson2', { excluded: [] }]],
	},
	reactStrictMode: true,
	images: {
		remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
	},
};

module.exports = nextConfig;
