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
				suggestions_dark: '#1D1D1D',
				suggestions_light: '#F2F2F2',
			},
		},
	},
	plugins: [],
} satisfies Config;
