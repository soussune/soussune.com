<template>
  <img
    :src="actor.imageUrl"
    :title="actor.title"
    @error="imgError(actor)"
  >
</template>

<script lang="ts" src="./ActorIcon.ts">
</script>
