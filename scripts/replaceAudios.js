require('dotenv').config()
const contentful = require('contentful')
const fs = require('fs-extra')
const path = require('path')
const episodeDir = path.resolve(__dirname, '../src/content/episode')

const client = contentful.createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CPA_TOKEN,
  host: 'preview.contentful.com'
})

const replaceAudios = async () => {
  const files = await fs.readdir(episodeDir)
  const { items } = await client.getAssets({ mimetype_group: 'audio' })
  const draftItems = items.filter((i) => i.sys.revision === 0)

  draftItems
    .map((i) => ({ title: i.fields.title, url: i.fields.file.url }))
    .sort((a, b) => Number(a.title) - Number(b.title))
    .forEach(async (i) => {
      const file = files.find((f) => f.match(new RegExp(`${i.title}\.md$`)))
      if (!file) {
        console.error('No episode file:', i.title)
        return
      }

      const filepath = path.resolve(episodeDir, file)
      console.log('Replace:', i.title, filepath)

      const data = await fs.readFile(filepath)
      await fs.writeFile(
        filepath,
        data.toString().replace(/^(audioFilePath:).*$/m, `$1 https:${i.url}`)
      )
    })
}

replaceAudios()
