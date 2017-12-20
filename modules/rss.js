const fs = require('fs')
const path = require('path')

const defaults = {
  path: '/feed.xml',
  description: null,
  routes: []
}

const getXml = (meta, pages) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:media="http://search.yahoo.com/mrss/" xml:lang="${meta.language}">
    <channel>
      <atom:link href="${meta.url}/feed.xml" rel="self" type="application/rss+xml" />
      <link>${meta.url}</link>
      <title>${meta.title} - ${meta.subtitle}</title>
      <description>${meta.description}</description>
      <media:keywords>${meta.keywords}</media:keywords>
      <media:category scheme="http://www.itunes.com/dtds/podcast-1.0.dtd">Technology</media:category>
      <language>${meta.language}</language>
      <itunes:subtitle>${meta.description}</itunes:subtitle>
      <itunes:author>${meta.author}</itunes:author>
      <itunes:summary>${meta.description}</itunes:summary>
      <itunes:keywords>${meta.keywords}</itunes:keywords>
      <itunes:owner>
        <itunes:name>${meta.author}</itunes:name>
        <itunes:email>${meta.email}</itunes:email>
      </itunes:owner>
      <itunes:image href="${meta.url}/images/itunes-artwork.jpg" />
      <itunes:category text="Technology">
        <itunes:category text="Tech News"/>
        <itunes:category text="Software How-To"/>
      </itunes:category>
      <itunes:explicit>no</itunes:explicit>
      ${pages
        .slice(1)
        .reverse()
        .map(
          (page) =>
            `<item>
          <title>${page.title}</title>
          <link>${meta.url + page.path}</link>
          <pubDate>${page.published}</pubDate>
          <description>${page.body}</description>
          <guid isPermaLink="true">${meta.url + page.audioFilePath}</guid>
          <enclosure url="${meta.audioUrl + page.audioFilePath}" length="${page.audioFileSize}" type="audio/mp3"/>
          <itunes:author>${meta.author}</itunes:author>
          <itunes:subtitle></itunes:subtitle>
          <itunes:duration>${page.duration}</itunes:duration>
          <itunes:explicit>no</itunes:explicit>
          <media:thumbnail url="${meta.url}/images/itunes-artwork.jpg"/>
        </item>`
        )
        .join(' ')}
    </channel>
  </rss>`
}

module.exports = function nuxtRss () {
  const options = Object.assign({}, defaults, this.options.meta)
  const rssPath = path.resolve(path.join('static', options.path))
  const xml = getXml(options, options.routes)
  fs.writeFileSync(rssPath, xml)
}
