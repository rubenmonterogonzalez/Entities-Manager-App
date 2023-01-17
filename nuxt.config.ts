// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icon',
  ],
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Entities Manager App',
      meta: [
        { name: 'description', content: 'Entities Manager' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  runtimeConfig: {
    MONGO_URL: process.env.MONGO_URL,
  },
  nitro: {
    plugins: [
      "~/server/db/index.ts",
    ]
  },
  build: {
    transpile: [
      "vue-toastification",
    ],
  },
  typescript: {
    shim: false,
  },
})

