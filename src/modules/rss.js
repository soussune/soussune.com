const fs = require('fs-extra')
const path = require('path')
const RSS = require('rss')

const defaults = {
  path: '/feed.xml',
  description: null,
  routes: []
}

const createRssFeed = (options, items) => {
  const feed = new RSS(options)

  items.reverse().map((item) => {
    feed.item(item)
  })
  return feed
}

module.exports = function rssModule(moduleOptions) {
  const options = {
    ...defaults,
    ...this.options.rss,
    ...moduleOptions
  }

  this.nuxt.hook('build:before', async (builder) => {
    fs.writeFileSync(rssPath, feed.xml({ indent: true }))
  })
}
