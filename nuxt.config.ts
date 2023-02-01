// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-icon",
  ],
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Entities Manager App",
      meta: [{ name: "description", content: "Entities Manager" }],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  runtimeConfig: {
    // MONGO_URL: process.env.MONGO_URL,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME
  },
  nitro: {
    plugins: ["~/server/db/index.ts"],
  },
  build: {
    transpile: ["vue-toastification"],
  },
  typescript: {
    shim: false,
  },
});
