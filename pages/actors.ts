export default {
  asyncData: async (context: any) => {
    const app: any = context.app
    const appearCounts: { [key: string]: number } = (await app
      .$content('/episode')
      .query({ exclude: [ 'meta', 'body', 'anchors', 'date' ] })
      .getAll())
      .map((post) => post.actor_ids)
      .reduce((a, b) => [ ...a, ...b ])
      .reduce((map: { [key: string]: number }, actorId: string) => {
        map[actorId] = map.hasOwnProperty(actorId) ? map[actorId] + 1 : 1
        return map
      }, {})

    const actors: any = (await app
      .$content('/actors')
      .query({ exclude: [ 'meta', 'body', 'anchors', 'date' ] })
      .getAll())
      .map((actor) => {
        actor.appears = appearCounts[actor.actor_id]
        return actor
      })
      .sort((a, b) => b.appears - a.appears)

    return { actors }
  }
}
