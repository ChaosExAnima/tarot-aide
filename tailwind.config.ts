import { nextui } from '@nextui-org/react';
import { Config } from 'tailwindcss';

module.exports = {
	content: [
		'./components/**/*.{ts,tsx}',
		'./pages/**/*.{ts,tsx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
		},
	},
	darkMode: 'class',
	plugins: [
		nextui({
			themes: {
				light: {},
				dark: {
					colors: {
						primary: {
							50: '#f8e3ff',
							100: '#deb2ff',
							200: '#c87fff',
							300: '#b14cff',
							400: '#9a1aff',
							500: '#8100e6',
							600: '#6400b4',
							700: '#470082',
							800: '#2b0050',
							900: '#100020',
							DEFAULT: '#8100e6',
						},
						secondary: {
							50: '#fffada',
							100: '#fff4ad',
							200: '#fff17d',
							300: '#fff24b',
							400: '#fff61a',
							500: '#e6ce00',
							600: '#b39400',
							700: '#806200',
							800: '#4d3600',
							900: '#1b1000',
							DEFAULT: '#e6ce00',
						},
					},
				},
			},
		}),
	],
} satisfies Config;
