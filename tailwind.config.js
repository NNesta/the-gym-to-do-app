/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 0 10px 0 rgb(0 0 0 / 50%)",
      },
      colors: {
        current: {
          900: "#EBEBEB",
          500: "#008C8E",
        },
      },
    },
  },
  plugins: [],
};
