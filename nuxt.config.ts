// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    'nuxt-icon',
  ],

  css: [
    'vue-toast-notification/dist/theme-sugar.css',
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

  runtimeConfig: {
    realmAppId: process.env.REALM_APP_ID,
    hedera: {
      operator: {
        accountId: process.env.HEDERA_OPERATOR_ACCOUNT_ID,
        privateKey: process.env.HEDERA_OPERATOR_PRIVATE_KEY,
      },
      file: {
        publicKey: process.env.HEDERA_FILE_PUBLIC_KEY,
        privateKey: process.env.HEDERA_FILE_PRIVATE_KEY,
      },
    },
    public: {
      realmAppId: process.env.REALM_APP_ID,
    },
  },
})
