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
if (process.env.NODE_ENV === 'production') {
	nextConfig.basePath = process.env.BASE_PATH ?? '';
	nextConfig.assetPrefix = process.env.BASE_PATH ? `${process.env.BASE_PATH}/` : '';
}

console.log('Building on basePath:', nextConfig.basePath);

export default nextConfig;
