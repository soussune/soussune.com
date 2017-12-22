import * as EpisodeHelper from '~/helpers/EpisodeHelper.js'

type Post = {
  actorIds: string[]
  topics: string[]
  description: string | null
}

export default {
  mounted () {
    // Load twitter widget on SPA mode
    if (window['twttr']) window['twttr'].widgets.load(this.$refs.content)
  },
  asyncData ({ store, route }) {
    const episode = store.getters.episodeByPath(route.path)
    return {
      episode: {
        ...episode,
        actors: episode.actorIds.map((actorId) => store.getters.actorById(actorId))
      }
    }
  },
  filters: {
    desc (episode): string {
      return EpisodeHelper.desc(episode)
    }
  },
  head () {
    return {
      title: this.episode.title
    }
  }
}
