import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./components/**/*.{ts,tsx}',
		'./pages/**/*.{ts,tsx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	darkMode: 'class',
	plugins: [
		nextui({
			themes: {
				light: {},
				dark: {
					colors: {
						primary: '#8F00FF',
					},
				},
			},
		}),
	],
};
