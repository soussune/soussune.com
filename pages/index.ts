import { DateTime } from 'luxon'

type Actor = {
  actorId: string
  title: string
  imageUrl: string
}

type Post = {
  actorIds: string[]
  topics: string[]
  description: string | null
}

export default {
  asyncData: async ({ app }) => ({
    posts: await app.$content('/episode').query({ exclude: [ 'meta', 'body', 'anchors', 'date' ] }).getAll(),
    actors: (await app
      .$content('/actors')
      .query({ exclude: [ 'meta', 'body', 'anchors', 'date' ] })
      .getAll()).reduce((map, actor) => {
      map[actor.actorId] = actor
      return map
    }, {})
  }),
  filters: {
    date (val: string) {
      return DateTime.fromSQL(val).toFormat('yyyy年MM月dd日')
    },
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
