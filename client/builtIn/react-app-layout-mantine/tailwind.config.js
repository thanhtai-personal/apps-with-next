const plugin = require('tailwindcss/plugin');

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./dist/**/*.{js,ts,jsx,tsx,d.ts}"
  ],
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animate-duration': (value) => ({
            animationDuration: value,
          }),
        },
        { values: theme('transitionDuration') }
      )
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animate-delay': (value) => ({
            animationDelay: value,
          }),
        },
        { values: theme('transitionDelay') }
      )
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animate-ease': (value) => ({
            animationTimingFunction: value,
          }),
        },
        { values: theme('transitionTimingFunction') }
      )
    }),
  ],
  mode: "build",
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "2px",
        sm: "4px",
        md: "4px",
        lg: "6px",
        xl: "8px",
        "2xl": "16px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        "item-active": "var(--color-item-active)",
        "text-active": "#1740CF",
        "text-default": "#262424",
        "bg-footer": "#101010",
        "text-label": "#8C8C8C",
        "text-warning": "#E4C65B",
        "bg-header": "#123247",
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        base: "0px 0px 1px rgba(40, 41, 61, 0.08), 0px 0.5px 2px rgba(96, 97, 112, 0.16)",
      },
      keyframes: {
        zoom: {
          "0%, 100%": { transform: "scale(0.5)" },
          "50%": { transform: "scale(1)" },
        },
        "slide_down": {
          "0%": { transform: "translateY(-100%))" },
        }
      },
      animation: {
        zoom: "zoom 1s ease-in-out infinite",
        "slide-down": "slide_down 0.8s ease-in-out"
      },
      backgroundImage: {
        "bg-gradient": "var(--gradient)"
      }
    },
  },
};