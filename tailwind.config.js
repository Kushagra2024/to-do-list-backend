/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,ejs}"],
	theme: {
		extend: {
			keyframes: {
				entering: {
					from: {
						opacity: "0",
						transform: "scale(0.95)",
					},
					to: {
						opacity: "100",
						transform: "scale(1)",
					},
				},
				leaving: {
					to: {
						opacity: "0",
						transform: "scale(0.95)",
					},
				},
			},
			animation: {
				entering: "entering 100ms ease-out forwards",
				leaving: "leaving 75ms ease-in forwards",
			},
		},
	},
	plugins: [],
};
