const fs = require('fs')
const path = require('path')
const fm = require('front-matter')
const md = require('markdown-it')({ html: true })
const EpisodeHelper = require('../helpers/EpisodeHelper')

const epContentDir = '../content/episode'
const host = 'https://soussune.com'
const epUrlDir = '/episode'
const cdnPath = 'https://s3-ap-northeast-1.amazonaws.com/cdn.soussune.com/audio'
const type = 'audio/mp3'
const author = 'そうっすね制作委員会'

const twitterUrl = 'https://twitter.com/intent/tweet'
const googleFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSe4p8EuJIocQ_PJl7qe-lZ--pD7AN3LCk4FefDW0DmSBTBHIA/viewform'
const hashtags = 'soussune'
const usp = 'sf_link'
const getUrl = (path, params) => {
  const q = Object.keys(params)
    .map(
      (key) =>
        params[key] && params[key] !== '' ? `${key}=${encodeURIComponent(params[key])}` : undefined
    )
    .filter((item) => item)
    .join('&')
  return q === '' ? path : `${path}?${q}`
}
const letterWanted = (url) => {
  return `<hr><h2>💬おたより募集中</h2>
soussuneでは感想や質問などリスナーからのご意見をお待ちしています。
<ul>
  <li><a href="${getUrl(twitterUrl, {
    hashtags,
    url
  })}">Twitter</a></li>
  <li><a href="${getUrl(googleFormUrl, {
    usp,
    'entry.286431956': url
  })}">感想フォーム</a></li>
</ul>
からお気軽にコメントをお寄せください`
}
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
      const epUrl = `${host}${epUrlDir}/${epUrlbasename}`

      return {
        title: attr.title,
        description: md.render(subtitle + body + letterWanted(epUrl)),
        url: epUrl,
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
