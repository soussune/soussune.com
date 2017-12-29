export default {
  props: {
    actor: { type: Object, required: true }
  },
  methods: {
    imgError (actor) {
      throw new Error(`Image not found at ${actor.imageUrl}. (actor: ${actor.actorId})`)
    }
  }
}
