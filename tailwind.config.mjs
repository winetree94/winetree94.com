import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	prefix: 'tw-',
	theme: {
		colors: {
			black: {
				50: '#f6f6f6',
				100: '#e7e7e7',
				200: '#d1d1d1',
				300: '#b0b0b0',
				400: '#888888',
				500: '#6d6d6d',
				600: '#5d5d5d',
				700: '#4f4f4f',
				800: '#454545',
				900: '#3d3d3d',
				950: '#000000',
			},
			white: {
				50: '#ffffff',
				100: '#efefef',
				200: '#dcdcdc',
				300: '#bdbdbd',
				400: '#989898',
				500: '#7c7c7c',
				600: '#656565',
				700: '#525252',
				800: '#464646',
				900: '#3d3d3d',
				950: '#292929',
			},
			purple: {
				100: '#ece9ff',
				200: '#ffe0e0',
			},
			blue: {
				100: '#E9F3FF',
				200: '#d6e9ff',
				300: '#c3e0ff',
				400: '#4a90e2',
				500: '#1781FE',
			},
		},
		extend: {
			screens: {
				'print': { 'raw': 'print' },
			}
		},
	},
	plugins: [
		plugin(({ addBase, config }) => {
			addBase({
				'h1': {
					fontSize: config('theme.fontSize.4xl'),
				},
				'h2': {
					fontSize: config('theme.fontSize.3xl'),
				},
				'h3': {
					fontSize: config('theme.fontSize.2xl'),
				},
				'h4': {
					fontSize: config('theme.fontSize.xl'),
				},
				'h5': {
					fontSize: config('theme.fontSize.lg'),
				},
				'h6': {
					fontSize: config('theme.fontSize.base'),
				},
				'p': {
					fontSize: config('theme.fontSize.base'),
				},
				'a': {
					color: config('theme.colors.blue.400'),
				},
				'hr': {
					border: 0,
					borderTop: `1px solid ${config('theme.colors.black.200')}`,
				},
				'main': {
					width: '720px',
					maxWidth: 'calc(100% - 2em)',
					margin: 'auto',
					padding: '3em 1em',
				},
			})
		})
	],
}
