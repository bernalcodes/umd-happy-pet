/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"happy-color-primary": "#A072FF",
				"happy-color-primary-light": "#E5D8FF",
				"happy-color-secondary": "#36336F",
				"happy-color-text": "#121733",
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
				"hero-signup": "url(/signup-img.jpg)"
			}
		},
	},
	plugins: [],
};
