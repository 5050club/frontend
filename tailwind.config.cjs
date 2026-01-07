const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  safelist: [
    'bg-slate-50',
    'text-slate-900',
    'bg-slate-100',
    'text-slate-800',
    'bg-slate-200',
    'text-slate-600',
    'text-slate-500',
    'text-slate-400'
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.slate,
      },
    },
  },
  plugins: [],
}
