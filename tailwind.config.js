/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./styles/**/*.{js,jsx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'background-color': '#023047',
				'primary': '#8ECAE6',
				'secondary': '#219EBC',
				'primary-contrast-text': '#FB8500',
				'secondary-contrast-text': '#FFB703',
			},
		},
	},
	plugins: [],
};
