
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {

      'charade': {
        '50': '#f5f7fa',
        '100': '#ebeef3',
        '200': '#d2d9e5',
        '300': '#aab8cf',
        '400': '#7c92b4',
        '500': '#5b759c',
        '600': '#485d81',
        '700': '#3b4b69',
        '800': '#344158',
        '900': '#272f3f',/* DEFAULT */
        '950': '#1f2432',
    },
    'picton-blue': {
        '50': '#f0faff',
        '100': '#e1f3fd',
        '200': '#bce8fb',
        '300': '#81d7f8',
        '400': '#3ec3f2',
        '500': '#15ace3',/* DEFAULT */
        '600': '#088ac1',
        '700': '#086e9c',
        '800': '#0b5d81',
        '900': '#0f4d6b',
        '950': '#0a3247',
    },
    'botticelli': {
        '50': '#f5f8fa',
        '100': '#e9f1f5',
        '200': '#cde0e8',/* DEFAULT */
        '300': '#a4c7d5',
        '400': '#72abbe',
        '500': '#5190a6',
        '600': '#3e758b',
        '700': '#335e71',
        '800': '#2d4f5f',
        '900': '#2a4450',
        '950': '#1c2c35',
    },
    'regent-gray': {
        '50': '#f8f9fa',
        '100': '#f3f4f4',
        '200': '#e8eaec',
        '300': '#d6dadc',
        '400': '#bec4c7',
        '500': '#a2aab0',
        '600': '#8c949c',/* DEFAULT */
        '700': '#798088',
        '800': '#656b72',
        '900': '#54595e',
        '950': '#373b3e',
    },
    
    
    
    

      },
      
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
});
