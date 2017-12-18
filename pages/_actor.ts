export default {
  asyncData: async (context) => {
    const { app, route, payload } = context
    const actor = (await app.$content('/actors').get(route.path)) || payload
    const { actor_id } = actor
    const episodes = (await app.$content('/episode').getAll()).filter((e) => e.actor_ids.some((a) => a === actor_id))

    return { actor, episodes }
  }
}
