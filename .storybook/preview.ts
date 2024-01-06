import type { Parameters } from '@storybook/types';
import { withThemeByClassName } from '@storybook/addon-themes';

import 'styles/globals.css';
import 'styles/fonts.css';

export const parameters: Parameters = {
	layout: 'centered',
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
