module.exports = {
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
};
