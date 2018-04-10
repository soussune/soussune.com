<template>
  <img
    :src="value.imageUrl"
    :title="value.title"
    @error="imgError"
  >
</template>

<script>
import Raven from 'raven-js'

class ActorImageError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ActorImageError'
  }
}
export default {
  props: {
    value: { type: Object, required: true }
  },
  methods: {
    imgError() {
      Raven.captureException(
        new ActorImageError(
          `Image not found at ${this.value.imageUrl}. (actor: ${this.value.actorId})`
        ),
        { level: 'warning' }
      )

      this.$emit('input', {
        ...this.value,
        imageUrl: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png'
      })
    }
  }
}
</script>
