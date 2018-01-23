<template>
  <div>
    <ul class="actor-list">
      <li
        v-for="(actor, i) in sortedActors"
        :key="actor.title"
        class="actor-list-item"
      >
        <nuxt-link :to="actor.permalink">
          <ActorIcon
            v-model="sortedActors[i]"
          />
          <p>{{ actor.title }} ({{ actor.episodes.length }})</p>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import ActorIcon from '~/components/ActorIcon.vue'

export default {
  components: {
    ActorIcon
  },
  computed: {
    sortedActors() {
      return this.actors.sort((a, b) => {
        // sort by appearCount or lastAppearDate
        const countDiff = b.episodes.length - a.episodes.length
        return countDiff !== 0 ? countDiff : b.episodes[0].published - a.episodes[0].published
      })
    }
  },
  async asyncData({ app }) {
    return {
      actors: await app.$contentLoader.getActors()
    }
  },
  head() {
    return {
      title: 'All actors'
    }
  }
}
</script>
<style lang="scss" scoped>
.actor-list {
  &-item {
    display: inline-block;
    margin-bottom: 1rem;
    text-align: center;
    min-width: 100px;
    font-size: 0.8rem;

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
