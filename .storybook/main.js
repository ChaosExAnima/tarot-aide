module.exports = {
	stories: ['../components/**/*.stories.*'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'storybook-dark-mode',
		'storybook-addon-swc',
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5',
	},
};
