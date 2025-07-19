import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./styles/**/*.{js,ts}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Red Hat Display", "sans-serif"],
				"red-hat-display": ["Red Hat Display", "sans-serif"],
				ubuntu: ["Ubuntu", "sans-serif"],
				"open-sans": ["Open Sans", "sans-serif"],
			},
			colors: {
				"background-color": "#023047",
				primary: "#8ECAE6",
				secondary: "#219EBC",
				"primary-contrast": "#FB8500",
				"secondary-contrast": "#FFB703",
				brand: {
					primary: "#8ECAE6",
					secondary: "#219EBC",
				},
			},
			animation: {
				shimmer: "shimmer 2s ease-in-out infinite",
			},
			keyframes: {
				shimmer: {
					"0%": { backgroundPosition: "-200% 0" },
					"100%": { backgroundPosition: "200% 0" },
				},
			},
		},
	},
	plugins: [],
};

export default config;