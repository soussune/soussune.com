const nodeExternals = require('webpack-node-externals')
const episodes = require('./server/sitemap').episodes

module.exports = {
  router: {
    // https://ja.nuxtjs.org/api/configuration-router#scrollBehavior
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      } else {
        // Scroll to top as default
        let position = { x: 0, y: 0 }
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position
      }
    }
  },
  modules: [ '@nuxtjs/onesignal', '@nuxtjs/pwa', '~/modules/rss', 'nuxtent' ],
  workbox: {
    dev: true
  },
  css: [
    '~/assets/css/reset.scss',
    '~/assets/css/style.scss',
    '~/assets/css/layout.scss',
    '~/assets/css/pageTrans.scss'
  ],
  head: {
    title: 'エンジニアわいわいポッドキャスト「そうっすね」',
    titleTemplate: 'soussune - %s',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { name: 'description', content: 'テクノロジーと世の中についてエンジニア達が雑談するポッドキャストです。', hid: 'description' },
      { name: 'application-name', content: 'soussune' },
      { name: 'format-detection', content: 'telephone-no' },

      // Google
      { name: 'theme-color', content: '#FFFFFF' },

      // twitter
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@soussunefm' },
      { name: 'twitter:title', content: 'soussune - エンジニアわいわいポッドキャスト「そうっすね」', hid: 'twTitle' },
      { name: 'twitter:url', content: 'https://.soussune.com', hid: 'twUrl' },
      { name: 'twitter:image', content: '', hid: 'twImage' },
      { name: 'twitter:description', content: 'テクノロジーと世の中についてエンジニア達が雑談するポッドキャストです。', hid: 'twDesc' },

      // Facebook
      // { property: 'fb:app_id', content: '' },
      { property: 'og:title', content: 'soussune - エンジニアわいわいポッドキャスト「そうっすね」', hid: 'ogTitle' },
      { property: 'og:site_name', content: 'soususne' },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: 'https://soussune.com', hid: 'ogUrl' },
      { property: 'og:locale:alternate', content: 'ja' },
      { property: 'og:image', content: '', hid: 'ogImage' },
      { property: 'og:description', content: 'テクノロジーと世の中についてエンジニア達が雑談するポッドキャストです。', hid: 'ogDesc' },

      // Apple iTunes
      { name: 'apple-itunes-app', content: 'app-id=1247135079' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'alternate', type: 'application/rss+xml', href: '/feed.xml' }
    ]
  },
  build: {
    vendor: [ 'luxon', 'vue-awesome' ],
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [ /^vue-awesome/ ]
          })
        ]
      }
    }
  },
  rss: {
    title: 'soussune - エンジニアわいわいポッドキャスト「そうっすね」',
    description: 'テクノロジーと世の中についてエンジニア達が雑談するポッドキャストです。',
    feed_url: 'https://soussune.com/feed.xml',
    site_url: 'https://soussune.com/',
    image_url: 'https://soussune.com/images/itunes-artwork.jpg',
    webMaster: 'soussune.user@email.com (soussune)',
    managingEditor: 'soussune.user@email.com (soussune)',
    copyright: '2017 soussune',
    language: 'ja',
    pubDate: 'Thu, 01 Jun 2017 04:00:00 GMT',
    ttl: '60',
    custom_namespaces: {
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
      itunesu: 'http://www.itunesu.com/feed'
    },
    custom_elements: [
      { 'itunes:subtitle': 'エンジニアわいわいポッドキャスト「そうっすね」' },
      { 'itunes:author': 'そうっすね制作委員会' },
      { 'itunes:summary': 'テクノロジーと世の中についてエンジニア達が雑談するポッドキャストです。' },
      { 'itunes:keywords': 'soussune, tech, technology, keyboard, web, development, developer' },
      {
        'itunes:owner': [ { 'itunes:name': 'そうっすね制作委員会' }, { 'itunes:email': 'soussune.user@gmail.com' } ]
      },
      {
        'itunes:image': {
          _attr: {
            href: 'https://soussune.com/images/itunes-artwork.jpg'
          }
        }
      },
      {
        'itunes:category': [
          {
            _attr: {
              text: 'Technology'
            }
          },
          {
            'itunes:category': {
              _attr: {
                text: 'Tech News'
              }
            }
          },
          {
            'itunes:category': {
              _attr: {
                text: 'Software How-To'
              }
            }
          }
        ]
      },
      { 'itunes:explicit': 'no' }
    ]
  },
  rssItems: episodes.episode,
  oneSignal: {
    init: {
      appId: '0c93cec2-86ac-419b-a0f1-a1b41ee6172e',
      allowLocalhostAsSecureOrigin: true,
      autoRegister: true,
      welcomeNotification: {
        disable: true
      },
      notifiyButton: {
        enable: true
      }
    }
  },
  loading: { color: '#3B8070' },
  plugins: [ '~plugins/vue-awesome.js' ]
}
