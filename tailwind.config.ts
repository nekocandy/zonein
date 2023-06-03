import type { Config } from 'tailwindcss'

export default {
  content: [
    './**/*.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
