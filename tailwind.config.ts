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
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('daisyui'),
  ],
} satisfies Config
