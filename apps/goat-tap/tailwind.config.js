const plugin = require('tailwindcss/plugin');

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
  mode: "jit",
  darkMode: "class",
  theme: {
    screens: {
      'xxxs': '235px',
      'xxs': '300px',
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      "hf1": "430px",
      "hf2": "525px",
      "hf3": "1060px",
      'ms': "1440px",
    },
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
        'xxxs': '235px',
        'xxs': '300px',
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        "hf1": "430px",
        "hf2": "525px",
        "hf3": "1060px",
        'ms': "1440px",
      },
    },
    extend: {
      colors: {
        "item-active": "var(--color-item-active)",
        "text-active": "#1740CF",
        "text-active-2": "#5E7EED",
        "text-active-3": "#305AE8",
        "text-default": "#262424",
        "bg-footer": "#101010",
        "text-label": "#8C8C8C",
        "text-warning": "#E4C65B",
        "text-secondary": "#829AED",
        "text-description-white": "#CFCFCF",
        "text-description": "#707070",
        "text-orange": "#ffc870"
      },
      fontFamily: {
        helvetica: ["Helvetica Neue", "sans-serif"],
        inria: ["Inria Serif", "serif"],
        monomaniac: ["Monomaniac One", "sans-serif"],
        playfair: ["Playfair Display"]
      },
      boxShadow: {
        base: "0px 0px 1px rgba(40, 41, 61, 0.08), 0px 0.5px 2px rgba(96, 97, 112, 0.16)",
        base2:
          "0px 2px 4px rgba(40, 41, 61, 0.04), 0px 8px 16px rgba(96, 97, 112, 0.16)",
        base3: "16px 10px 40px rgba(15, 23, 42, 0.22)",
        deep: "-2px 0px 8px rgba(0, 0, 0, 0.16)",
        dropdown: "0px 4px 8px rgba(0, 0, 0, 0.08)",

        testi: "0px 4px 24px rgba(0, 0, 0, 0.06)",
        todo: "rgba(235 233 241, 0.6) 0px 3px 10px 0px",
        "light-white": "0px 2px 4px 1px #c6dbe2",
        dark: "0px 2px 4px 1px #302708",
        "text-light": "0px 2px 4px #f8f8f7",
        "text-dark": "0px 2px 4px #454503",
      },
      keyframes: {
        zoom: {
          "0%, 100%": { transform: "scale(0.5)" },
          "50%": { transform: "scale(1)" },
        }
      },
      animation: {
        zoom: "zoom 1s ease-in-out infinite"
      },
      backgroundImage: {
        "bg-gradient": "var(--gradient)"
      }
    },
  },
};