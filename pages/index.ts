import { DateTime } from 'luxon'
import * as EpisodeHelper from '~/helpers/EpisodeHelper.js'
import ActorIcon from '~/components/ActorIcon.vue'

const showCount = 10
export default {
  components: {
    ActorIcon
  },
  asyncData ({ store, route }) {
    return {
      episodes: store.state.episodes.map((episode) => ({
        ...episode,
        actors: episode.actorIds.map((actorId) => store.getters.actorsMap[actorId])
      }))
    }
  },
  computed: {
    topEpisodes () {
      return this.episodes.slice(0, showCount)
    },
    moreEpisode () {
      return this.episodes[showCount]
    }
  },
  filters: {
    date (episode) {
      return DateTime.fromMillis(episode.published).toFormat('yyyy年MM月dd日')
    },
    desc (episode): string {
      return EpisodeHelper.desc(episode)
    }
  }
}
