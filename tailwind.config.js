/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'content': '2000px',
      },
      colors: {
        'background': '#1a100a',
        'surface': '#2e2014',
        'text-primary': '#d1d5db',
        'text-secondary': '#9ca3af',
        'border': '#4a3b2e',
      },
      backgroundColor: {
        'transparent': 'rgba(26, 16, 10, 0.2)',
      },
      keyframes: {
        radioactiveGlow: {
          'from': { boxShadow: '0 0 2px #00FF00, 0 0 4px #00FF00, 0 0 6px #00FF00' },
          'to': { boxShadow: '0 0 4px #00FF00, 0 0 8px #00FF00, 0 0 12px #00FF00' },
        },
      },
      animation: {
        radioactiveGlow: 'radioactiveGlow 1.5s infinite alternate',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('supports-backdrop-blur', '@supports (backdrop-filter: blur(1rem))');
    },
  ],
}