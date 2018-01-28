<template>
  <main
    class="page-container"
  >
    <header class="actor">
      <ActorIcon
        v-model="actor"
        class="actor-icon"
      />
      <h1 class="actor-title"> {{ actor.title }} </h1>
    </header>

    <section class="accounts" v-if="hasAccount(actor)">
      <a
        v-if="actor.accounts.twitter"
        :href="`https://twitter.com/${actor.accounts.twitter}`"
        class="button"
        target="_blank"
        rel="noopener"
      >
        <icon name="twitter" class="twitter" scale="1.6"/>
        Twitter
      </a>
      <a
        v-if="actor.accounts.github"
        :href="`https://github.com/${actor.accounts.github}`"
        class="button"
        target="_blank"
        rel="noopener"
      >
        <icon name="github" class="github" scale="1.6"/>
        GitHub
      </a>
    </section>

    <section class="desc" v-if="actor.description">
      {{actor.description}}
    </section>

    <section class="body" v-if="actor.body">
      <nuxtent-body :body="actor.body" class="marked" />
    </section>

    <section class="episodes">
      <h2 class="episodes-title">出演エピソード</h2>
      <div class="episodes-list">
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
          （未登場）
        </p>
      </div>
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
  methods: {
    hasAccount(actor) {
      return actor.accounts && Object.values(actor.accounts).some((val) => val)
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
  position: relative;
  text-align: left;
  font-size: 1.1rem;

  display: grid;
  grid-gap: 2rem;
  justify-items: center;

  @include mq() {
    padding: 20px 10px 40px;
    margin: 20px 0px;
  }
}
.actor {
  text-align: center;

  &-icon {
    width: 200px;
    height: 200px;
  }
  &-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: $clr-black-dd;
  }
}

.accounts {
  display: grid;
  grid-gap: 1em;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 200px);

  .button {
    @import '~assets/css/_roundButton.scss';
    border: 2px solid $clr-black;
  }
}

.episodes {
  &-title {
    color: $clr-black-d;
    text-align: center;
    font-size: 1.8rem;
  }
}
</style>
