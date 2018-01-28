<template>
  <main
    class="page-container"
    ref="content"
  >
    <section>
      <header class="title">
        <ActorIcon
          v-model="actor"
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
  </main>
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
@import '~assets/css/_vars.scss';
@import '~assets/css/mixin/_mediaquery.scss';

.page-container {
  background: #fff;
  border-radius: 0.6rem;
  box-shadow: 0 1.2rem 3.6rem rgba(0, 0, 0, 0.2);
  padding: 80px 60px;
  margin: 0 20px;
  position: relative;

  @include mq() {
    padding: 20px 10px 40px;
    margin: 20px 0px;
  }
}
.body,
.episodes {
  text-align: left;
}
.icon {
  width: 200px;
  height: 200px;
}
.content-container {
  max-width: 38rem;
  margin: 0 auto;
}

.actor-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: $clr-black-dd;
}
</style>
