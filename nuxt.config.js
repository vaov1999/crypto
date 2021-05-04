export default {
  target: 'static',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [{ src: '@/assets/styles/main.sass', lang: 'sass' }],

  styleResources: {
    sass: './assets/styles/variables.sass',
  },

  plugins: [
    {
      src: '~/plugins/amCharts.js',
      ssr: false,
    },
  ],

  components: true,

  buildModules: ['@nuxtjs/eslint-module'],

  modules: ['@nuxtjs/axios', '@nuxt/content', '@nuxtjs/style-resources'],

  axios: {},

  content: {},

  build: {},
}
