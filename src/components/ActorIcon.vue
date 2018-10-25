<template>
  <img
    :src="src"
    :title="actor.title"
    class="img"
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
      const params = {
        w: this.size,
        h: this.size,
        fm: 'jpg',
        fl: 'progressive'
      }
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
