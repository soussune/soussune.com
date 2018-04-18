const fs = require('fs-extra')
const path = require('path')
const RSS = require('rss')

const defaults = {
  path: '/feed.xml',
  description: null,
  routes: []
}

const createRss = (options, items) => {
  const rss = new RSS(options)

  items.reverse().map((item) => {
    rss.item(item)
  })
  return rss
}

module.exports = function feedModule(moduleOptions) {
  const options = {
    ...defaults,
    ...this.options.rss,
    ...moduleOptions
  }

  const xml = createRss(options, this.options.rssItems).xml({ indent: true })

  this.options.build.plugins.push({
    apply(compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        compilation.assets[options.path] = {
          source: () => xml,
          size: () => xml.length
        }
        cb()
      })
    }
  })
}
