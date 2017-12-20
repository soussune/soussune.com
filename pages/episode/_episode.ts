import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters([ 'episodeByPath', 'actorById' ]),
    episode () {
      const episode = this.episodeByPath(this.$route.path)
      return {
        ...episode,
        actors: episode.actorIds.map((actorId) => this.actorById(actorId))
      }
    }
  },
  filters: {
    desc (episode): string {
      return EpisodeHelper.desc(episode)
    }
  }
}
