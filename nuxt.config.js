const sitemap = require('./server/sitemap').sitemap

module.exports = {
  modules: [ '@nuxtjs/pwa', '~/modules/rss', 'nuxtent' ],
  css: [
    '~/assets/css/reset.scss',
    '~/assets/css/style.scss',
    '~/assets/css/layout.scss'
  ],
  head: {
    title: 'soussune',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'soussune' }
    ],
    link: [ { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' } ]
  },
  build: {
    vendor: [ 'luxon' ],
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  meta: {
    language: 'ja',
    title: 'soussune',
    subtitle: 'エンジニアわいわいポッドキャスト「そうっすね」',
    url: 'https://soussune.com',
    audioUrl: 'https://cdn.soussune.com/audio',
    description: 'テクノロジーと世の中についてエンジニア達が雑談するポッドキャストです。',
    keywords: 'soussune,tech,technology,keyboard,web,development,developer',
    author: 'そうっすね制作委員会',
    email: 'soussune.user@gmail.com',
    routes: sitemap.posts
  },
  routes: {},
  loading: { color: '#3B8070' }
}
