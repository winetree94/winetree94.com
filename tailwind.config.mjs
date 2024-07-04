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
		extend: {},
	},
	plugins: [],
}
