const plugin = require('tailwindcss/plugin');
import postcss from "rollup-plugin-postcss";

/** @type {import("tailwindcss").Config} */
module.exports = {
  purge: ["./src/**/*.tsx"],
  plugins: [
    postcss({
      config: {
        path: "./postcss.config.js",
      },
      extensions: [".css"],
      minimize: true,
      inject: {
        insertAt: "top",
      },
    }),
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
        text: "var(--text-color)",
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        eczar: ["Eczar", "serif"]
      },
      keyframes: {
        zoom: {
          "0%, 100%": { transform: "scale(0.5)" },
          "50%": { transform: "scale(1)" },
        },
        tada: {
          "0%": { transform: "scale3d(1, 1, 1)" },
          "10%, 20%": {
            transform: "scale3d(1, 1, 0.95) rotate3d(0, 0, 1, -10deg)",
          },
          "30%, 50%, 70%, 90%": {
            transform: "scale3d(1, 1, 1) rotate3d(0, 0, 1, 10deg)",
          },
          "40%, 60%, 80%": {
            transform: "rotate3d(0, 0, 1, -10deg)",
          },
          "100%": { transform: "scale3d(1, 1, 1)" },
        },
        fadeltr: {
          "0%": { width: "100%" },
          "40%": { width: "0%" },
          "60%": { width: "0%" },
          "100%": { width: "100%" }
        },
        fadertl: {
          "0%": { width: "0%" },
          "40%": { width: "100%" },
          "60%": { width: "100%" },
          "100%": { width: "0%" }
        },
        fade_in_ltr_70: {
          "0%": { opacity: 0, transform: "translateX(-70%)" },
          "95%": { opacity: 1, transform: "translateX(20%)" },
          "100%": { opacity: 1 }
        },
        fade_in_ltr_150: {
          "0%": { opacity: 0, transform: "translateX(-150%)" },
          "95%": { opacity: 1, transform: "translateX(20%)" },
          "100%": { opacity: 1 }
        },
        fade_in_ltr_250: {
          "0%": { opacity: 0, transform: "translateX(-250%)" },
          "95%": { opacity: 1, transform: "translateX(20%)" },
          "100%": { opacity: 1 }
        },
        fade_in_ltr_350: {
          "0%": { opacity: 0, transform: "translateX(-350%)" },
          "95%": { opacity: 1, transform: "translateX(20%)" },
          "100%": { opacity: 1 }
        },
        fade_in_ltr: {
          "0%": { opacity: 0, transform: "translateX(-70%)" },
          "100%": { opacity: 1 }
        },
        fade_in_rtl: {
          "0%": { opacity: 0, transform: "translateX(70%)" },
          "100%": { opacity: 1 }
        },
        fade_in: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        spin_custom: {
          "0%": {
            transform: "rotate(0deg)"
          },
          "40%": {
            transform: "rotate(3599deg)"
          },
          "60%": {
            transform: "rotate(3599deg)"
          },
          "100%": {
            transform: "rotate(0deg)"
          },
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        zoom: "zoom 1s ease-in-out infinite",
        tada: "tada 1.5s ease-in-out infinite",
        fadeltr: "fadeltr 3s ease-in alternate infinite",
        fadertl: "fadertl 3s ease-in alternate infinite",
        fade_in_rtl: "fade_in_rtl .25s ease-in",
        fade_in_ltr: "fade_in_ltr .25s ease-in",
        fade_in_ltr_70: "fade_in_ltr_70 .25s ease-in",
        fade_in_ltr_150: "fade_in_ltr_150 .25s ease-in",
        fade_in_ltr_250: "fade_in_ltr_250 .25s ease-in",
        fade_in_ltr_350: "fade_in_ltr_350 .25s ease-in",
        fade_in: "fade_in .3s ease-in",
        spin_2: "spin_custom 36s linear infinite",
        spin_3: "spin_custom 42s linear infinite",
        spin_4: "spin_custom 60s linear infinite",
      },
      backgroundImage: {
        "bg-gradient": "var(--gradient)"
      }
    },
  },
};