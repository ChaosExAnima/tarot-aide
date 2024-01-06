import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
	stories: ['../components/**/*.stories.*'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-themes',
		'storybook-dark-mode',
		'storybook-addon-swc',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {
			builder: {
				useSWC: true,
			},
		},
	},
	core: {
		disableTelemetry: true,
	},
};

export default config;
