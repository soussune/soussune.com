<template>
  <main
    class="page-container"
  >
    <header class="actor">
      <ActorIcon
        :actor="actor"
        :size="200"
        class="actor-icon"
      />
      <h1 class="actor-title"> {{ actor.title }} </h1>
    </header>

    <section class="accounts" v-if="actor.accounts">
      <a
        v-for="(account, service) in actor.accounts"
        :key="service"
        :href="service, account | serviceUrl"
        class="button"
        target="_blank"
        rel="noopener"
      >
        <icon
          :name="service"
          :class="service"
          scale="1.6"
        />
        {{service | serviceLabel}}
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
            <nuxt-link :to="ep.permalink" :aria-label="ep.title">
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

<script>
import ActorIcon from '~/components/ActorIcon.vue'

const serviceInfo = {
  twitter: {
    label: 'Twitter',
    url: 'https://twitter.com/'
  },
  github: {
    label: 'GitHub',
    url: 'https://github.com/'
  },
  medium: {
    label: 'Medium',
    url: 'https://medium.com/'
  }
}

export default {
  components: {
    ActorIcon
  },
  async asyncData({ app, params }) {
    return {
      actor: await app.$contentLoader.getActor(params.id)
    }
  },
  filters: {
    serviceUrl(service, account) {
      return serviceInfo[service] && `${serviceInfo[service].url}${account}`
    },
    serviceLabel(service) {
      return serviceInfo[service] && serviceInfo[service].label
    }
  },
  head() {
    return {
      title: this.actor.title,
      meta: [
        {
          property: 'og:title',
          content: `soussune - ${this.actor.title}`,
          hid: 'ogTitle'
        },
        {
          property: 'og:description',
          content: this.actor.description,
          hid: 'ogDesc'
        },
        {
          property: 'og:image',
          content: this.actor.imageUrl,
          hid: 'ogImage'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
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
