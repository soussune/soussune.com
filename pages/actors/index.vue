<template>
  <ul class="actor-list">
    <li
      v-for="actor in sortedActors"
      :key="actor.title"
      class="actor-list-item"
    >
      <nuxt-link :to="actor.permalink">
        <img
          :src="actor.imageUrl"
          :title="actor.title"
        >
        <p>{{ actor.title }} ({{ actor.episodes.length }})</p>
      </nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts" src="./index.ts">
</script>
<style lang="scss" scoped>
.actor-list {

  &-item {
    display: inline-block;
    margin-bottom: 1rem;
    text-align: center;
    min-width: 100px;
    font-size: 14px;

    & a {
      text-decoration: none;
    }

    & img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
}
</style>
