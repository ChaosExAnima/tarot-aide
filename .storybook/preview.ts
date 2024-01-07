import type { Parameters } from '@storybook/types';
import { withThemeByClassName } from '@storybook/addon-themes';

import 'styles/globals.css';

export const parameters: Parameters = {
	layout: 'centered',
	nextjs: {
		router: {
			pathname: '/',
		},
	},
};

export const decorators = [
	withThemeByClassName({
		themes: {
			light: '',
			dark: 'dark',
		},
		defaultTheme: 'dark',
	}),
];
