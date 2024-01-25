/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		swcPlugins: [['next-superjson-plugin', { excluded: [] }]],
	},
	reactStrictMode: true,
	images: {
		remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
	},
	output: 'standalone',
	basePath: '/tarot',
	env: {
		BASE_URL: '/tarot',
	}
};

export default nextConfig;
