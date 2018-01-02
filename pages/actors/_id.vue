<template>
  <section>

    <header class="title">
      <ActorIcon
        :actor="actor"
        class="icon"
      />
      <h1 class="actor-title"> {{ actor.title }} </h1>
    </header>

    <section class="body">
      <p>{{actor.description}}</p>
      <nuxtent-body :body="actor.body" class="marked" />
    </section>

    <section class="episodes">
      <h2>episodes</h2>
      <ul v-if="0 < actor.episodes.length">
        <li
          v-for="ep in actor.episodes"
          :key="ep.permalink"
          class="actor-list-item"
        >
          <nuxt-link :to="ep.permalink">
            {{ ep.title }}
          </nuxt-link>
        </li>
      </ul>
      <p v-else>
        not appeared yet.
      </p>
    </section>

  </section>
</template>

<script lang="ts">
import ActorIcon from '~/components/ActorIcon.vue'

export default {
  components: {
    ActorIcon
  },
  async asyncData({ app, params }) {
    return {
      actor: await app.$contentLoader.getActor(params.id)
    }
  },
  head() {
    return {
      title: this.actor.title
    }
  }
}
</script>

<style lang="scss" scoped>
.body, .episodes {
  text-align: left;
}
.icon {
  width: 200px;
  height: 200px;
}
.content-container
{
  max-width: 38rem;
  margin: 0 auto
}

.actor-title
{
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
  color: #35495e;
}
</style>
