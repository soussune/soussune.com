import { DateTime } from 'luxon'

type Actor = {
  actor_id: string
  title: string
  image_url: string
}

type Post = {
  actor_ids: string[]
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
      map[actor.actor_id] = actor
      return map
    }, {})
  }),
  filters: {
    date (val: string) {
      return DateTime.fromSQL(val).toFormat('yyyy年MM月dd日')
    },
    desc (post: Post): string {
      if (post.description !== null) return post.description

      const combinedActors = post.actor_ids.join('と')
      const postActors = 1 < post.actor_ids.length ? `の${post.actor_ids.length}人で` : 'が'

      const combinedTopics = post.topics.join('、')
      const postTopics = 1 < post.topics.length ? 'など' : ''

      return `${combinedActors}${postActors}、${combinedTopics}${postTopics}について話しました。`
    }
  }
}
