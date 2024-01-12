/* @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      'bgGray': '#D6D4CE',
      "bgButtonBlue": "#456DA5",
      "colorTextButtonBlue": "#003A40",
      "colorTextWelcomeBlue": "#1B365D",
      "colorMenuText": "#64748B",
    },
    width: {
      'loginWidth': '470x',
    },
    height: {
      'loginHeight': '690px',
    },
    theme: {
      fontFamily: {
        'thrifty': ['Thrifty', 'sans-serif'], // Font for the specific page
      }
    },
    screens: {
      '2xl-height': {'raw': '(min-height: 780px)'},
    },
  },
};
export const plugins = [];
