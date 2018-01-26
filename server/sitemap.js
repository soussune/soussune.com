const fs = require('fs')
const path = require('path')
const fm = require('front-matter')
const md = require('markdown-it')({ html: true })
const EpisodeHelper = require('../helpers/EpisodeHelper')

const epContentDir = '../content/episode'
const host = 'https://soussune.com'
const epUrlDir = '/episode'
const cdnPath = 'http://cdn.soussune.com.s3-ap-northeast-1.amazonaws.com/audio'
const type = 'audio/mp3'
const author = 'そうっすね制作委員会'

const getEpisode = () => {
  return fs
    .readdirSync(path.join(__dirname, epContentDir))
    .map((basename) => {
      const match = basename.match(/^(?:\d+-){3}(.*)\..+$/)
      if (!match) return null

      const epUrlbasename = match[1]
      const content = fs.readFileSync(path.join(__dirname, `${epContentDir}/${basename}`), 'utf8')
      const { attributes: attr, body } = fm(content)
      const subtitle = EpisodeHelper.desc(attr)

      return {
        title: attr.title,
        description: md.render(subtitle + body),
        url: `${host}${epUrlDir}/${epUrlbasename}`,
        date: attr.published,
        enclosure: {
          url: cdnPath + attr.audioFilePath,
          length: attr.audioFileSize,
          type: type
        },
        custom_elements: [
          { 'itunes:author': author },
          { 'itunes:subtitle': subtitle },
          { 'itunes:duration': attr.duration },
          { 'itunes:explicit': 'no' }
        ]
      }
    })
    .filter((item) => item)
}

module.exports.episodes = {
  episode: getEpisode()
}
