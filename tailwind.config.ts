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
	plugins: [],
}
