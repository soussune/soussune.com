<template>
  <main
    class="page-container"
  >
    <header class="title">
      <ActorIcon
        v-model="actor"
        class="icon"
      />
      <h1 class="actor-title"> {{ actor.title }} </h1>
    </header>

    <section class="accounts">
      <a
        v-if="actor.twitterUsername"
        :href="`https://twitter.com/${actor.twitterUsername}`"
        class="button"
        target="_blank"
      >
        <icon name="twitter" scale="1.1"/>
        Twitter
      </a>
      <a
        v-if="actor.githubUsername"
        :href="`https://github.com/${actor.githubUsername}`"
        class="button"
        target="_blank"
      >
        <icon name="github" scale="1.1"/>
        GitHub
      </a>
    </section>

    <section class="desc">
      <p>{{actor.description}}</p>
    </section>

    <section class="body">
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
  text-align: left;

  display: grid;
  grid-gap: 1rem;

  @include mq() {
    padding: 20px 10px 40px;
    margin: 20px 0px;
  }
}
.title {
  text-align: center;
}
.icon {
  width: 200px;
  height: 200px;
}

.actor-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: $clr-black-dd;
}
.accounts {
  display: grid;
  grid-gap: 1em;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 200px);
  width: max-content;
  margin: 0 auto;

  .button {
    @import '~assets/css/_roundButton.scss';
    border: 2px solid $clr-black;
  }
}
</style>
