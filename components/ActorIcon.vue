<template>
  <img
    :src="src"
    :title="actor.title"
  >
</template>

<script>
export default {
  props: {
    actor: { type: Object, required: true },
    size: { type: Number, default: 200 }
  },
  computed: {
    src() {
      const params = { w: this.size, h: this.size }
      return [
        this.actor.imageUrl,
        Object.keys(params)
          .map((key) => [key, params[key]].join('='))
          .join('&')
      ].join('?')
    }
  }
}
</script>
