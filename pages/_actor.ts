export default {
  asyncData: async (context) => {
    const { app, route, payload } = context
    const actor = (await app.$content('/actors').get(route.path)) || payload
    const { actorId } = actor
    const episodes = (await app.$content('/episode').getAll()).filter((e) => e.actorIds.some((a) => a === actorId))

    return { actor, episodes }
  }
}
