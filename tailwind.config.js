/** @type {import('tailwindcss').Config} */
// tailwind.config.js

const plugin = require("tailwindcss/plugin");

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue}",
    ],
    darkMode: 'class',
    theme: {
    },
    variants: {
    },
    plugins: [
        plugin(function ({ addVariant, e }) {
            addVariant("oled", ".oled &");
            addVariant("light", ".light &");
            addVariant("fallout", ".fallout &");
            addVariant("yellow", ".yellow &");
            addVariant("computer", ".computer &");
            addVariant("modern", ".modern &");
            addVariant("modern-dark", ".modern-dark &");
            addVariant("night", ".night &");
        })
    ],
}


