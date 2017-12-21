const fs = require('fs-extra')
const path = require('path')
const RSS = require('rss')

const defaults = {
  path: '/feed.xml',
  description: null,
  routes: []
}

module.exports = function rssModule (moduleOptions) {
  const options = Object.assign({}, defaults, this.options.rss, moduleOptions)
  const rssPath = path.resolve(path.join('static', options.path))
  const feed = createRssFeed(options, this.options.rssItems)

  this.nuxt.plugin('build', async builder => {
    fs.writeFileSync(rssPath, feed.xml({ indent: true }))
  })
}

function createRssFeed (options, items) {
  const feed = new RSS(options)

  items.reverse().map((item) => {
    feed.item(item)
  })
  return feed
}
