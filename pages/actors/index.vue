<template>
  <div class="actors">
    <ul class="actors-list">
      <li
        v-for="(actor, i) in sortedActors"
        :key="actor.title"
        class="actors-list-item"
      >
        <nuxt-link class="actor" :to="actor.permalink">
          <ActorIcon
            v-model="sortedActors[i]"
            class="actor-icon"
          />
          <div class="actor-aside">
            <h2 class="actor-title">
              {{ actor.title }}
              <span class="actor-role" v-if="actor.role">
                {{ actor.role }}
              </span>
            </h2>
            <p class="actor-description">出演回数: {{ actor.episodes.length }}</p>
            <div class="actor-footer">
              <icon name="github" class="github" scale="1.6" v-if="actor.githubUsername"></icon>
              <icon name="twitter" class="twitter" scale="1.6" v-if="actor.twitterUsername"></icon>
              <button class="actor-button">もっと詳しく</button>
            </div>
          </div>
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
@import '~assets/css/_vars.scss';
@import '~assets/css/mixin/_mediaquery.scss';

.actors {
  &-list {
    display: block;
    margin: -10px -10px;

    @include mq() {
      width: 100%;
      margin: 0;
    }

    &-item {
      display: inline-block;
      position: relative;
      width: calc(50% - 1.2rem);
      height: 100px;
      margin: 0.6rem;
      min-width: 100px;
      font-size: 0.8rem;
      border-radius: 0.3rem;
      box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15);
      transition: all 0.15s ease;

      @include mq() {
        width: calc(100% - 2.4rem);
      }

      &:hover {
        box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05), 0 5px 18px 0 rgba(63, 63, 68, 0.15);
      }
    }
  }
}

.actor {
  text-decoration: none;
  position: absolute;
  left: 0;
  width: 100%;
  background: $clr-white-ll;
  border-radius: 0.3rem;
  text-align: left;

  &-icon {
    max-width: 100px;
    display: inline-block;
    padding: 0;
    vertical-align: top;
    margin-right: 1rem;
    border-radius: 0.3rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &-aside {
    max-width: calc(100% - 100px);
    display: inline-block;
    vertical-align: top;
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
    color: $clr-sub;
    font-size: 0.6rem;
    font-weight: 600;
    padding: 0.2rem 0.3rem;
    vertical-align: middle;
    margin-left: 4px;
    border-radius: 4px;
  }

  &-description {
    font-size: 0.9rem;
    font-weight: 400;
    color: $clr-black-ll;
  }

  &-footer {
    margin-top: 0.2rem;

    svg {
      margin-left: 0.8rem;

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
  }

  &-button {
    display: inline-block;
    position: absolute;
    right: 10px;
    bottom: 10px;
    border: none;
    padding: 10px;
    line-height: 15px;
    font-size: 14px;
    font-weight: 400;
    color: $clr-main-ll;
    background: $clr-white-ll;

    &:hover {
      background: $clr-white-l;
    }
  }
}
</style>
