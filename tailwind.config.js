/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class','[data-theme="dark"]'],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'],
  theme: {
    extend: {colors: {
        bg:        'var(--color-bg)',
        surface:   'var(--color-surface)',
        border:    'var(--color-border)',
        text:      'var(--color-text)',
        'text-alt':'var(--color-text-alt)',
        primary:   'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      }},
  },
  plugins: [],
}

