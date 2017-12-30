import ActorIcon from '~/components/ActorIcon.vue'

export default {
  components: {
    ActorIcon
  },
  computed: {
    sortedActors () {
      return [ ...this.$store.getters.actorsWithEpisodes ].sort((a, b) => {
        // sort by appearCount or lastAppearDate
        const countDiff = b.episodes.length - a.episodes.length
        return countDiff !== 0 ? countDiff : b.episodes[0].published - a.episodes[0].published
      })
    }
  },
  head () {
    return {
      title: 'All actors'
    }
  }
}
