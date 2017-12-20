import { DateTime } from 'luxon'
import { mapState } from 'vuex'

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
      if (episode.description !== null) return episode.description

      const combinedActors = episode.actorIds.join('と')
      const postActors = 1 < episode.actorIds.length ? `の${episode.actorIds.length}人で` : 'が'

      const combinedTopics = episode.topics.join('、')
      const postTopics = 1 < episode.topics.length ? 'など' : ''

      return `${combinedActors}${postActors}、${combinedTopics}${postTopics}について話しました。`
    }
  }
}
