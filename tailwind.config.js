/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
				"roboto-condensed": ["Roboto Condensed", "sans-serif"],
				"roboto-slab": ["Roboto Slab", "sans-serif"],
				bodoni: ["Libre Bodoni", "serif"],
				rye: ["Rye", "cursive"],
			},
		},
	},
	plugins: [],
};
