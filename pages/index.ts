import { DateTime } from 'luxon'
import { mapState } from 'vuex'
import * as EpisodeHelper from '~/helpers/EpisodeHelper.js'

export default {
  computed: {
    ...mapState([ 'actors' ]),
    episodes () {
      return this.$store.state.episodes.map((episode) => ({
        ...episode,
        actors: episode.actorIds.map((actorId) => this.actorsMap[actorId])
      }))
    },
    actorsMap () {
      return this.actors.reduce((map, actor) => ({ ...map, [actor.actorId]: actor }), {})
    }
  },
  filters: {
    date (date: string) {
      return DateTime.fromSQL(date).toFormat('yyyy年MM月dd日')
    },
    desc (episode): string {
      return EpisodeHelper.desc(episode)
    }
  }
}
