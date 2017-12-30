<template>
  <div>
    <ul class="actor-list">
      <li
        v-for="actor in sortedActors"
        :key="actor.title"
        class="actor-list-item"
      >
        <nuxt-link :to="actor.permalink">
          <ActorIcon
            :actor="actor"
          />
          <p>{{ actor.title }} ({{ actor.episodes.length }})</p>
        </nuxt-link>
      </li>
    </ul>
  </div>
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
