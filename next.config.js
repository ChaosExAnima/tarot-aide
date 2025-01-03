/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		swcPlugins: [['next-superjson-plugin', { excluded: [] }]],
		instrumentationHook: true,
	},
	reactStrictMode: true,
	images: {
	},
	output: 'standalone',
};
if (process.env.BASE_PATH) {
	nextConfig.basePath = process.env.BASE_PATH;
	nextConfig.assetPrefix = `${process.env.BASE_PATH}/`;
}

export default nextConfig;
