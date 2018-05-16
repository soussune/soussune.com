<template>
  <div class="actors">
    <ul class="actors-list">
      <li
        v-for="actor in sortedActors"
        :key="actor.title"
        class="actors-list-item"
      >
        <nuxt-link class="actor" :to="actor.permalink" :aria-label="actor.title">
          <ActorIcon
            :actor="actor"
            :size="100"
            class="actor-icon"
          />
          <div class="actor-aside">
            <h2 class="actor-title">
              <span>{{ actor.title }}</span>
              <span v-if="actor.realname">&nbsp;({{ actor.realname }})</span>
              <span class="actor-role" v-if="actor.role">
                {{ actor.role }}
              </span>
            </h2>
            <p class="actor-description">出演回数: {{ actor.episodes.length }}</p>
            <div class="actor-footer" v-if="actor.accounts">
              <icon
                v-for="(account, service) in actor.accounts"
                :key="service"
                :name="service"
                :class="service"
                scale="1"
              ></icon>
            </div>
            <div class="actor-button">もっと詳しく</div>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import ActorIcon from '~/components/ActorIcon.vue'

export default {
  components: {
    ActorIcon
  },
  computed: {
    sortedActors() {
      return this.actors.slice().sort((a, b) => {
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
  methods: {
    hasAccount(actor) {
      return actor.accounts && Object.values(actor.accounts).some((val) => val)
    }
  },
  head() {
    return {
      title: '出演者',
      meta: [
        {
          property: 'og:title',
          content: `soussune - 出演者`,
          hid: 'ogTitle'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.actors {
  &-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem 1.2rem;

    @include mq() {
      grid-template-columns: 1fr;
      grid-gap: 0.6rem;
    }

    &-item {
      position: relative;
      height: 100px;
      font-size: 0.8rem;
      border-radius: 0.3rem;
      box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15);
      transition: all 0.15s ease;

      &:hover {
        box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05), 0 5px 18px 0 rgba(63, 63, 68, 0.15);
      }
    }
  }
}

.actor {
  text-decoration: none;
  width: 100%;
  background: $clr-white-ll;
  border-radius: 0.3rem;
  text-align: left;

  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 1rem;

  &-icon {
    max-width: 100px;
    padding: 0;
    border-radius: 0.3rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &-title {
    margin: 0.4rem 0 0;
    font-size: 18px;
    font-weight: 400;
    color: $clr-black;
    display: flex;
    align-items: center;
  }

  &-role {
    background: $clr-sub-ll;
    color: $clr-sub-d;
    font-size: 0.6rem;
    font-weight: 600;
    padding: 0.08rem 0.3rem;
    vertical-align: middle;
    margin-left: 4px;
    border-radius: 4px;
  }

  &-description {
    font-size: 0.9rem;
    font-weight: 400;
    color: $clr-black-l;
  }

  &-footer {
    margin-top: 0.4rem;

    svg {
      margin-left: 0.4rem;

      &:first-child {
        margin-left: 0;
      }
    }
    .twitter {
      color: #1da1f2;
    }
    .github {
      color: #000000;
    }
    .medium {
      color: #000000;
    }
  }

  &-button {
    display: inline-block;
    position: absolute;
    right: 0.7em;
    bottom: 0.7em;
    border: none;
    font-size: 0.9rem;
    color: $clr-main-ll;
    background: transparent;

    @include mq() {
      font-size: 0.8rem;
    }
  }
}
</style>
