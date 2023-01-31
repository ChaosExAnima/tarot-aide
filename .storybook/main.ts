import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
	stories: ['../components/**/*.stories.*'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'storybook-dark-mode',
		'storybook-addon-swc',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	core: {
		disableTelemetry: true,
	},
};

export default config;
