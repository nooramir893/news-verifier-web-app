/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:  '#0F766E',
        secondary:'#06B6D4',
        navy: { 950:'#020617', 900:'#0A1628', 800:'#0F1F3D', 700:'#152A52' },
        neon: '#22C55E',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-dm)', 'sans-serif'],
        mono:    ['var(--font-jb)', 'monospace'],
      },
    },
  },
  plugins: [],
}
