import { DateTime } from 'luxon'
import { mapState } from 'vuex'
import * as EpisodeHelper from '~/helpers/EpisodeHelper.js'
import ActorIcon from '~/components/ActorIcon.vue'

export default {
  components: {
    ActorIcon
  },
  computed: {
    ...mapState([ 'actorsMap' ]),
    episodes () {
      return this.$store.getters.filteredEpisodes.map((episode) => ({
        ...episode,
        actors: episode.actorIds.map((actorId) => this.actorsMap[actorId])
      }))
    }
  },
  filters: {
    date (episode) {
      return DateTime.fromMillis(episode.published).toFormat('yyyy年MM月dd日')
    },
    desc (episode): string {
      return EpisodeHelper.desc(episode)
    }
  },
  methods: {
    removeQuery (i) {
      const queries = this.$store.state.queries.slice()
      queries.splice(i, 1)
      this.$store.commit('searchText', queries.join(' '))
      this.$store.commit('searchFocus', !!queries.length)
    }
  },
  destroyed () {
    this.$store.commit('searchText', '')
    this.$store.commit('searchFocus', false)
  },
  head () {
    return {
      title: 'Episode list'
    }
  }
}
