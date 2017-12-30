export default {
  props: {
    actor: { type: Object, required: true }
  },
  methods: {
    imgError () {
      this.$store.commit('setDefaultActorIcon', this.actor.actorId)
      throw new Error(`Image not found at ${this.actor.imageUrl}. (actor: ${this.actor.actorId})`)
    }
  }
}
