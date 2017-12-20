import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([ 'episodes', 'actors' ]),
    sortedActors () {
      return [ ...this.actors ].sort((a, b) => {
        // sort by appearCount or lastAppearDate
        const countDiff = b.episodes.length - a.episodes.length
        return countDiff !== 0 ? countDiff : b.episodes[0].published - a.episodes[0].published
      })
    }
  }
}
