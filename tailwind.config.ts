import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgba(255, 220, 46, 1)',
          50: 'rgba(255, 250, 230, 1)',
          100: 'rgba(255, 245, 204, 1)',
          200: 'rgba(255, 240, 179, 1)',
          300: 'rgba(255, 235, 153, 1)',
          400: 'rgba(255, 230, 128, 1)',
          500: 'rgba(255, 220, 46, 1)',
          600: 'rgba(230, 198, 41, 1)',
          700: 'rgba(204, 176, 37, 1)',
          800: 'rgba(179, 154, 32, 1)',
          900: 'rgba(153, 132, 28, 1)',
        },
      },
    },
  },
  plugins: [],
};

export default config;

