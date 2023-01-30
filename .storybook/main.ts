import { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

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
	// webpack(config, options) {
	// 	if (!config.resolve) {
	// 		config.resolve = {};
	// 	}
	// 	config.resolve.alias = {
	// 		lib: path.resolve(__dirname, '../lib'),
	// 		styles: path.resolve(__dirname, '../styles'),
	// 	};
	// 	return config;
	// },
};

export default config;
