import { DateTime } from 'luxon'

export default {
  asyncData: async (context: any) => {
    const app: any = context.app

    const appearMap: { [key: string]: any } = (await app
      .$content('/episode')
      .query({ exclude: [ 'meta', 'body', 'anchors', 'date' ] })
      .getAll())
      .map((post) => {
        post.date = DateTime.fromSQL(post.published).toJSDate()
        return post
      })
      .reduce((map: any, post: any) => {
        post.actorIds.forEach((actorId) => {
          map[actorId] = [ ...(map[actorId] || []), post ]
        })
        return map
      }, {})

    const actors: any = (await app
      .$content('/actors')
      .query({ exclude: [ 'meta', 'body', 'anchors', 'date' ] })
      .getAll())
      .map((actor) => {
        actor.appears = appearMap[actor.actorId] || []
        return actor
      })
      .sort((a, b) => {
        // sort by appearCount or lastAppearDate
        const countDiff = b.appears.length - a.appears.length
        if (countDiff !== 0) return countDiff
        return b.appears[0].date - a.appears[0].date
      })

    return { actors }
  }
}
