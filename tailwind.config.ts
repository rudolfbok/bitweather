import type { Config } from 'tailwindcss';

export default {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				gray_custom: '#E6E5E5',
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				suggestions_dark: '#171717',
				suggestions_light: '#F8F8F8',
			},
		},
	},
	plugins: [],
} satisfies Config;
