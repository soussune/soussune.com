const nodeExternals = require('webpack-node-externals')
const episodes = require('./server/sitemap').episodes

const conf = {
  router: {
    // https://ja.nuxtjs.org/api/configuration-router#scrollBehavior
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      } else {
        // Scroll to top as default
        let position = { x: 0, y: 0 }
        if (to.hash) {
          position = { selector: to.hash, offset: { x: 0, y: 70 } }
        }
        return position
      }
    }
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/sentry',
    '~/modules/rss',
    '~/modules/typescript',
    'nuxtent',
    ['@nuxtjs/google-analytics', { id: 'UA-100444203-1' }]
  ],
  css: [
    '~/assets/css/reset.scss',
    '~/assets/css/style.scss',
    '~/assets/css/marked.scss',
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
      {
        name: 'description',
        content: 'テクノロジーと世の中についてエンジニア達が雑談するポッドキャストです。',
        hid: 'description'
      },
      { name: 'application-name', content: 'soussune' },
      { name: 'format-detection', content: 'telephone-no' },

      // Google
      { name: 'theme-color', content: '#FFFFFF' },

      // twitter
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@soussunefm' },
      {
        name: 'twitter:title',
        content: 'soussune - エンジニアわいわいポッドキャスト「そうっすね」',
        hid: 'twTitle'
      },
      { name: 'twitter:url', content: 'https://.soussune.com', hid: 'twUrl' },
      { name: 'twitter:image', content: 'https://soussune.com/ogp-artwork.jpg', hid: 'twImage' },
      {
        name: 'twitter:description',
        content: 'テクノロジーと世の中についてエンジニア達が雑談するポッドキャストです。',
        hid: 'twDesc'
      },

      // Facebook
      // { property: 'fb:app_id', content: '' },
      {
        property: 'og:title',
        content: 'soussune - エンジニアわいわいポッドキャスト「そうっすね」',
        hid: 'ogTitle'
      },
      { property: 'og:site_name', content: 'soususne' },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: 'https://soussune.com', hid: 'ogUrl' },
      { property: 'og:locale', content: 'ja_JP' },
      { property: 'og:image', content: 'https://soussune.com/ogp-artwork.jpg', hid: 'ogImage' },
      {
        property: 'og:description',
        content: 'テクノロジーと世の中についてエンジニア達が雑談するポッドキャストです。',
        hid: 'ogDesc'
      },

      // Apple iTunes
      { name: 'apple-itunes-app', content: 'app-id=1247135079' },

      // Microsoft
      { name: 'msapplication-TileColor', content: '#1c2260' },
      { name: 'msapplication-TileImage', content: '/mstile-144x144.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-touch-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-touch-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-touch-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-touch-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-touch-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-touch-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-touch-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-touch-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180x180.png' },
      { rel: 'mask-icon', color: '#1c2260', href: '/website_icon.svg' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48x48.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '160x160', href: '/favicon-160x160.png' },
      { rel: 'icon', type: 'image/png', sizes: '196x196', href: '/favicon-196x196.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'alternate', type: 'application/rss+xml', href: '/feed.xml' }
    ]
  },
  build: {
    vendor: ['luxon', 'vue-awesome', '@miyaoka/vue-touch-range'],
    extend(config, ctx) {
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
            whitelist: [/^vue-awesome/]
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
    image_url: 'https://soussune.com/itunes-artwork.jpg',
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
      {
        'itunes:summary': 'テクノロジーと世の中についてエンジニア達が雑談するポッドキャストです。'
      },
      { 'itunes:keywords': 'soussune, tech, technology, keyboard, web, development, developer' },
      {
        'itunes:owner': [
          { 'itunes:name': 'そうっすね制作委員会' },
          { 'itunes:email': 'soussune.user@gmail.com' }
        ]
      },
      {
        'itunes:image': {
          _attr: {
            href: 'https://soussune.com/itunes-artwork.jpg'
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
  loading: { color: '#3B8070' },
  sentry: {
    config: {
      shouldSendCallback: () => process.env.NODE_ENV === 'production'
    }
  },
  plugins: ['~plugins/vue-awesome.js', '~plugins/content-loader.js', '~plugins/vue-lazyload.js']
}

module.exports = conf
