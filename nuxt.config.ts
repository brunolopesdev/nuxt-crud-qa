import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
  ],
  css: [
    '~/assets/css/main.css'
  ],
  typescript: {
    strict: true,
  },
  imports: {
    dirs: ['stores']
  },
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
        }
      ]
    }
  }
})
