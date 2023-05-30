/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dvt-white-1": "#2A303C",
        "dvt-white-2": "#d5d3d8",
        "dvt-item": "#191D24",
      },
    },
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#fad56a",

          secondary: "#eb1484",

          info: "#3ABFF8",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#F87272",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
