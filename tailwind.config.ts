import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1.1' }],         // 48px
        '6xl': ['3.75rem', { lineHeight: '1.1' }],      // 60px
        '7xl': ['4.5rem', { lineHeight: '1.1' }],       // 72px
        '8xl': ['6rem', { lineHeight: '1.1' }],         // 96px
        '9xl': ['8rem', { lineHeight: '1.1' }],         // 128px
      },
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

