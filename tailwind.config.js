// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "dark-purple": "#081A51",
                "light-white": "rgba(255,255,255,0.17)",
            },
        },
    },
    darkMode: "class",
    plugins: [nextui()],
};
