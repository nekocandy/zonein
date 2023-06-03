import type { Config } from 'tailwindcss'

export default {
  content: [
    './**/*.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'mono'],
      },
    },
  },
  plugins: [],
} satisfies Config
