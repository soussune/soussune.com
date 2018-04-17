<template>
  <div>
    <slot ref="slot"/>
  </div>
</template>

<script>
const loadTwitter = (target) => {
  process.browser && twttr && twttr.widgets.load(target)
}

export default {
  mounted() {
    loadTwitter(this.$refs.slot)
  },
  updated() {
    loadTwitter(this.$refs.slot)
  }
}
</script>
