import { mapGetters } from 'vuex'

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
    desc (post: Post): string {
      if (post.description !== null) return post.description

      const combinedActors = post.actorIds.join('と')
      const postActors = 1 < post.actorIds.length ? `の${post.actorIds.length}人で` : 'が'

      const combinedTopics = post.topics.join('、')
      const postTopics = 1 < post.topics.length ? 'など' : ''

      return `${combinedActors}${postActors}、${combinedTopics}${postTopics}について話しました。`
    }
  }
}
