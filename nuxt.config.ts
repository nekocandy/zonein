// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],
  experimental: {
    watcher: 'chokidar',
  },

  googleFonts: {
    families: {
      Montserrat: {
        wght: [
          100, 200, 300, 400, 500, 600, 700, 800, 900,
        ],
        ital: [
          100, 200, 300, 400, 500, 600, 700, 800, 900,
        ],
      },
    },
  },
})
