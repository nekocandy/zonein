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
      Inter: true,
      Roboto: true,
    },
  },
})
