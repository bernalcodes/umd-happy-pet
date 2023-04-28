/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT'

module.exports = withMT({
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    	"path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"happy-color-primary": "#5A56EC",
				"happy-color-primary-light": "#4218D9",
				"happy-color-secondary": "#7EE7F2",
				"happy-color-text": "#0D0D0D",
				"happy-grey": "#9E9E9E",
				"happy-orange": "#FF8080",
				"happy-light-orange": "#FFF6EE",
				"happy-pink": "#FF6FCC",
				"happy-light-pink": "#FFEEF9",
				"happy-green": "#6ED95D",
				"happy-light-green": "#EEFFF2",
				"happy-blue": "#6590FD",
				"happy-light-blue": "#EFEEFF",
				"happy-grey-blue": "#EEF1FB",
			},
			backgroundImage: {
				"hero-signup": "url(/signup-img.jpg)",
				"hero-login": "url(/login-img.jpg)"
			}
		},
		fontFamily: {
			'k2d': ['K2D', 'sans-serif'],
			'mitr': ['Mitr', 'sans-serif'],
			'mukta': ['Mukta', 'sans-serif'],
			'kanit': ['Kanit', 'sans-serif'],
			'sans': ['Roboto', 'Arial', 'sans-serif']
		}
	},
	plugins: [require('prettier-plugin-tailwindcss')],
});
