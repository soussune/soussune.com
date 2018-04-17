<template>
  <nuxt-child/>
</template>

<script>
export default {
  transition(to, from) {
    return !from || from.name !== to.name
      ? 'page'
      : Number(to.params.id) > Number(from.params.id) ? 'slide-right' : 'slide-left'
  }
}
</script>

<style>
</style>
