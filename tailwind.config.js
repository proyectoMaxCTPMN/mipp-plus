const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/@heroui/theme/dist/components/(button|snippet|code|input).js',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        red: {
          colors: {
            primary: {
              50: '#ffe3e3',
              100: '#ffb3b3',
              200: '#fd8181',
              300: '#fc5050',
              400: '#fb221f',
              500: '#e10d06',
              600: '#af0503',
              700: '#7e0202',
              800: '#4c0000',
              900: '#1f0000',
              foreground: "#fff",
              DEFAULT: "#940202",
            },
            success: {
              100: "#CDFACC",
              200: "#9BF6A1",
              300: "#65E37B",
              400: "#3EC963",
              500: "#0DA545",
              600: "#098D47",
              700: "#067646",
              800: "#045F41",
              900: "#024F3D",
              foreground: "#fff",
              DEFAULT: "#0DA545"
            },
            secondary: {
              100: "#CAF3FC",
              200: "#97E1F9",
              300: "#62C4EE",
              400: "#3AA3DE",
              500: "#0477C9",
              600: "#025CAC",
              700: "#024490",
              800: "#013074",
              900: "#002260",
              foreground: "#fff",
              DEFAULT: "#0477C9"
            },
            warning: {
              100: "#FDF4CB",
              200: "#FBE897",
              300: "#F4D463",
              400: "#EABE3C",
              500: "#DD9F02",
              600: "#BE8301",
              700: "#9F6901",
              800: "#805000",
              900: "#6A3F00",
              foreground: "#fff",
              DEFAULT: "#DD9F02"
            },
            danger: {
              100: "#FAE1CE",
              200: "#F5BF9F",
              300: "#E18D6B",
              400: "#C35E43",
              500: "#9B2614",
              600: "#85150E",
              700: "#6F0A0C",
              800: "#59060E",
              900: "#4A0310",
              foreground: "#fff",
              DEFAULT: "#9B2614"
            }
          },
        },

        blue: {
          colors: {
            primary: {
              50: "#eaeeff",
              100: "#c4cdef",
              200: "#9facdf",
              300: "#7a8bd2",
              400: "#546ac4",
              500: "#3b50ab",
              600: "#2d3f85",
              700: "#202d60",
              800: "#111b3c",
              900: "#030919",
              foreground: "#fff",
              DEFAULT: "#1D2958",
            },
          },
        },

        aqua: {
          colors: {
            primary: {
              50: "#ddfefc",
              100: "#b8f5f0",
              200: "#90ece5",
              300: "#67e5da",
              400: "#40ddd0",
              500: "#29c4b6",
              600: "#1a988e",
              700: "#0c6d65",
              800: "#00423d",
              900: "#001815",
              foreground: "#fff",
              DEFAULT: "#1eada1",
            },
          },
        },

        light_blue: {
          colors: {
            primary: {
              50: "#e0f6ff",
              100: "#c1e0ee",
              200: "#9ecbdf",
              300: "#7bb5d0",
              400: "#57a0c1",
              500: "#3e86a8",
              600: "#2d6883",
              700: "#1d4a5f",
              800: "#0b2e3c",
              900: "#00111a",
              foreground: "#fff",
              DEFAULT: "#5aa1c2",
            },
          },
        },

        purple: {
          colors: {
            primary: {
              50: "#f2eaff",
              100: "#d3c6ef",
              200: "#b3a2df",
              300: "#957dd0",
              400: "#7757c1",
              500: "#5d3ea8",
              600: "#493083",
              700: "#34215f",
              800: "#1f143b",
              900: "#0b051a",
              foreground: "#fff",
              DEFAULT: "#795ac2",
            },
          },
        },

        beige: {
          colors: {
            primary: {
              50: "#fef1e5",
              100: "#e9d7c8",
              200: "#d6bea9",
              300: "#c4a488",
              400: "#b28a67",
              500: "#98704d",
              600: "#77573b",
              700: "#563e29",
              800: "#352416",
              900: "#180a00",
              foreground: "#fff",
              DEFAULT: "#c09e80",
            },
          },
        },
      },
    }),
  ],
};

