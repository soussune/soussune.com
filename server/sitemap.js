const fs = require('fs')
const path = require('path')
const fm = require('front-matter')
const md = require('markdown-it')({ html: true })
const EpisodeHelper = require('../helpers/EpisodeHelper')

const getEpisode = () => {
  let episodes = []

  fs.readdirSync(path.join(__dirname, '../content/episode/')).forEach((blogPost) => {
    const episodePath = 'https://soussune.com/episode'
    const cdnPath = 'https://cdn.soussune.com/audio'
    const type = 'audio/mp3'
    const author = 'そうっすね制作委員会'
    const filename = `${blogPost.substr(0, blogPost.length - 8)}`
    const urlPath = `/${filename.substr(11, blogPost.length)}`
    const post = fs.readFileSync(path.resolve(`content/episode/${blogPost}`), 'utf8')
    const frontmatter = fm(post)
    const subtitle = EpisodeHelper.desc(frontmatter.attributes)

    episodes.push({
      title: frontmatter.attributes.title,
      description: md.render(subtitle + frontmatter.body),
      url: episodePath + urlPath,
      date: frontmatter.attributes.published,
      enclosure: {
        url: cdnPath + frontmatter.attributes.audioFilePath,
        length: frontmatter.attributes.audioFileSize,
        type: type
      },
      custom_elements: [
        { 'itunes:author': author },
        { 'itunes:subtitle': subtitle },
        { 'itunes:duration': frontmatter.attributes.duration },
        { 'itunes:explicit': 'no' }
      ]
    })
  })

  return episodes
}

module.exports.episodes = {
  all: Array.prototype.concat(getEpisode().map((p) => p.path)),
  episode: getEpisode()
}
