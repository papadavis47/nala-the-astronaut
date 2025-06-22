/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'main-bg': 'hsl(36, 43%, 85%)',
        'card-bg': 'hsl(36, 43%, 90%)',
        'text-primary': 'hsl(0, 0%, 29%)',
        'headings': 'hsla(0, 16%, 29%, 1)',
        'hover-gold': 'hsl(45, 60%, 48%, 0.2)',
        'gold-start': 'hsl(45, 60%, 48%)',
        'gold-end': 'hsl(42, 86%, 32%)',
        'text-shadow': 'hsl(209, 23%, 23%)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to right top, hsl(45, 60%, 48%), hsl(42, 86%, 32%))',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      maxWidth: {
        'container': '900px',
      },
      textShadow: {
        'heading': '2px 2px 2px hsl(209, 23%, 23%)',
      },
      screens: {
        'md': '768px',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-heading': {
          textShadow: '2px 2px 2px hsl(209, 23%, 23%)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}