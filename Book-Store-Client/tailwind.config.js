/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"];
export const theme = {
  minHeight: {
    book: "520px",
  },
  extend: {
    colors: {
      "primary-100": "#B6FFFA",
      "primary-300": "#98E4FF",
      "primary-500": "#80B3FF",
      "primary-700": "#687EFF",
      "secondary-400": "#FFFFDD",
      "secondary-500": "#FFFD8C",
    },
    fontFamily: {
      dmsans: ["DM Sans", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
    boxShadow: {
      custom:
        "0px -2px 7px 3px rgba(0,0,0,0.45),0px 25px 20px -20px rgba(0,0,0,0.45);",
    },
  },
};

export const plugins = [];

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({ content: content, plugins: plugins, theme: theme });
