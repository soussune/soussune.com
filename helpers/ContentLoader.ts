import { DateTime } from 'luxon'

const exclude = ['meta', 'anchors', 'date']

const allEpisodes = async (app) => {
  return await app
    .$content('/episode')
    .query({ exclude })
    .getAll()
}
const allActors = async (app) => {
  return await app
    .$content('/actors')
    .query({ exclude })
    .getAll()
}

const excludeBody = (obj) => {
  if (!obj) return obj
  const { body, ...rest } = obj
  return rest
}

class ContentLoader {
  app = null
  episodes: any[] = []
  actors: any[] = []
  actorMap = {}
  actorEpisodeMap = {}
  isLoaded = false

  constructor(app) {
    this.app = app
  }
  async load() {
    if (this.isLoaded) return

    this.episodes = (await allEpisodes(this.app)).map((episode) => ({
      ...episode,
      published: DateTime.fromSQL(episode.published).valueOf(),
      id: episode.path.replace(/.*\/(.+)/, '$1')
    }))

    this.actors = await allActors(this.app)

    this.actorMap = this.actors.reduce((map, actor) => {
      return { ...map, [actor.actorId]: excludeBody(actor) }
    }, {})

    this.actorEpisodeMap = this.episodes.reduce((map, episode) => {
      episode.actorIds.forEach((actorId) => {
        map[actorId] = [...(map[actorId] || []), excludeBody(episode)]
      })
      return map
    }, {})

    this.isLoaded = true
  }
  async getHome() {
    await this.load()
    return this.episodes.map((episode) => excludeBody(this.episodeWithActors(episode)))
  }
  async getEpisodes() {
    await this.load()
    return this.episodes.map((episode) => this.episodeWithActors(episode))
  }
  async getEpisode(id) {
    await this.load()
    const episodeIndex = this.episodes.map((episode) => episode.id).indexOf(id)
    const episode = this.episodes[episodeIndex]

    return {
      ...this.episodeWithActors(episode),
      newer: excludeBody(this.episodes[episodeIndex - 1]),
      older: excludeBody(this.episodes[episodeIndex + 1])
    }
  }
  async getActors() {
    await this.load()
    return this.actors.map((actor) => excludeBody(this.actorWithEpisodes(actor)))
  }
  async getActor(id) {
    await this.load()
    const actor = this.actors.find((actor) => actor.actorId === id)

    return this.actorWithEpisodes(actor)
  }
  episodeWithActors(episode) {
    return {
      ...episode,
      actors: episode.actorIds.map((actorId) => this.actorMap[actorId])
    }
  }
  actorWithEpisodes(actor) {
    return {
      ...actor,
      episodes: this.actorEpisodeMap[actor.actorId] || []
    }
  }
}
export default ContentLoader
