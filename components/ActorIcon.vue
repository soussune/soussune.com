<template>
  <img
    :src="actor.imageUrl"
    :title="actor.title"
    @error="imgError"
  >
</template>

<script lang="ts">
class ActorImageError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'ActorImageError'
  }
}
export default {
  props: {
    actor: { type: Object, required: true }
  },
  methods: {
    imgError() {
      this.$store.commit('setDefaultActorIcon', this.actor.actorId)

      throw new ActorImageError(
        `Image not found at ${this.actor.imageUrl}. (actor: ${this.actor.actorId})`
      )
    }
  }
}
</script>
