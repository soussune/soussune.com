const fs = require('fs')
const path = require('path')
const fm = require('front-matter')
const xmlescape = require('xml-escape')
const md = require('markdown-it')({ html: true })
const EpisodeHelper = require('../helpers/EpisodeHelper')

const getPosts = () => {
  let blogPosts = [
    {
      path: '/episode'
    }
  ]

  fs.readdirSync(path.join(__dirname, '../content/episode/')).forEach((blogPost) => {
    const filename = `${blogPost.substr(0, blogPost.length - 8)}`
    const urlPath = `/episode/${filename.substr(11, blogPost.length)}`
    const post = fs.readFileSync(path.resolve(`content/episode/${blogPost}`), 'utf8')
    const frontmatter = fm(post)

    blogPosts.push({
      description: EpisodeHelper.desc(frontmatter.attributes),
      path: urlPath,
      title: frontmatter.attributes.title,
      published: frontmatter.attributes.published,
      topics: frontmatter.attributes.topics,
      duration: frontmatter.attributes.duration,
      audioFilePath: frontmatter.attributes.audioFilePath,
      audioFileSize: frontmatter.attributes.audioFileSize,
      actorIds: frontmatter.attributes.actorIds,
      body: xmlescape(md.render(frontmatter.body))
    })
  })

  return blogPosts
}

module.exports.sitemap = {
  all: Array.prototype.concat(getPosts().map((p) => p.path)),
  posts: getPosts()
}
