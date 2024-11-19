import { nextui } from '@core-ui/nextui-core/dist/base/theme'
import { lightColors, darkColors } from "./config/themes/colors"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@core-ui/nextui-core/node_modules/@nextui-org/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        // ...
        colors: lightColors,
      },
      dark: {
        // ...
        colors: darkColors,
      },
      // ... custom themes
    },
  })],
}
