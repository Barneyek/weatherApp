/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "regal-blue": "#2196F3",
        light: "#65b7f7",
      },
      fontFamily: {
        body: ['"Roboto"'],
      },
      placeholderColor: {
        light: "#65b7f7",
      },
    },
  },
  plugins: [],
};
