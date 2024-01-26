/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		swcPlugins: [['next-superjson-plugin', { excluded: [] }]],
	},
	reactStrictMode: true,
	images: {
		remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
	},
};
if (process.env.BASE_PATH) {
	nextConfig.basePath = process.env.BASE_PATH;
	nextConfig.assetPrefix = `${process.env.BASE_PATH}/`;
	console.log('Using basePath of', nextConfig.basePath);
}

export default nextConfig;
