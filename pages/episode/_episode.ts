type Post = {
  actorIds: string[]
  topics: string[]
  description: string | null
}

export default {
  asyncData: async ({ app, route, payload }) => {
    console.log(route.path)
    const post = (await app.$content('/episode').get(route.path)) || payload
    const actors = Promise.all(
      post.actorIds.map(async (actorId) => {
        console.log('/actors/' + actorId)
        return await app.$content('/actors').get(`/actors/${actorId}`)
      })
    )

    return { post, actors }
  },
  mounted () {
    // Load twitter widget on SPA mode
    if (window['twttr']) window['twttr'].widgets.load(this.$refs.content)
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
