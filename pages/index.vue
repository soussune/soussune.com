<template>
  <section class="page-container">

    <header class="header">
      <h1 class="title">
        soussune
      </h1>
      <p>
        エンジニアわいわいポッドキャスト「そうっすね」
      </p>
    </header>

    <main class="episodes">
      <nuxt-link
        :to="episode.permalink"
        v-for="episode in topEpisodes"
        :key="episode.permalink"
        class="episode"
      >
        <article>
          <header>
            <small>
              {{ episode | date }}
            </small>
            <h3 class="episode-title">
              {{ episode.title }}
            </h3>
          </header>
          <p>
            {{ episode | desc }}
          </p>
          <div class="actor-list">
            <ActorIcon
              class="actor-list-item"
              v-for="(actor, i) in episode.actors"
              :key="actor.actorId"
              v-model="episode.actors[i]"
            />
          </div>
        </article>
      </nuxt-link>

      <nav class="readmore" v-if="moreEpisode">
        <nuxt-link :to="{ path: '/episode', hash: 'ep' + moreEpisode.id }" class="button">
          Read more <icon name="chevron-right"></icon>
        </nuxt-link>
      </nav>

    </main>
  </section>
</template>

<script lang="ts">
import { DateTime } from 'luxon'
import * as EpisodeHelper from '~/helpers/EpisodeHelper.js'
import ActorIcon from '~/components/ActorIcon.vue'

const showCount = 10
export default {
  components: {
    ActorIcon
  },
  async asyncData({ app }) {
    return {
      episodes: await app.$contentLoader.getHome()
    }
  },
  computed: {
    topEpisodes() {
      return this.episodes.slice(0, showCount)
    },
    moreEpisode() {
      return this.episodes[showCount]
    }
  },
  filters: {
    date(episode) {
      return DateTime.fromMillis(episode.published).toFormat('yyyy年MM月dd日')
    },
    desc(episode): string {
      return EpisodeHelper.desc(episode)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/_vars.scss';

.header {
  text-align: center;
  .title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 500;
    color: $clr-black-d;
  }
}
.episodes {
  margin-top: 60px;
}

$ep-trans: 0.4s cubic-bezier(0.55, 0, 0.1, 1);
.episode {
  display: block;
  text-decoration: none;
  background: $clr-white-ll;
  border-radius: 0.3rem;
  box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15);
  padding: 10px 20px;
  margin-top: 20px;

  transition: $ep-trans;
  & * {
    transition: $ep-trans;
  }
  &:hover {
    color: inherit;
    background-color: $clr-sub-ll;
    box-shadow: none;
    box-shadow: 0 0 0 1px $clr-sub-l, 0 1px 3px 0 $clr-sub-ll;

    & * {
      color: $clr-black-dd;
    }
    & .actor-list img {
      border: 3px solid $clr-sub-ll;
    }
  }

  &-title {
    margin-top: 0.2em;
    color: $clr-black-d;
    font-size: 1.65rem;
    font-weight: 500;
    margin-bottom: 0.2em;
    & a {
      text-decoration: none;
    }
  }
}
.actor-list {
  margin-top: 8px;
  margin-left: 10px;

  &-item {
    margin-left: -12px;
  }
  & img {
    border-radius: 50%;
    border: 3px solid $clr-white-ll;
    box-sizing: content-box;
    background-origin: content-box;
    width: 60px;
    height: 60px;
  }
}

.readmore {
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  .button {
    text-decoration: none;
    color: $clr-black-d;
    font-size: 1.2rem;

    &:hover {
      color: $clr-sub-l;
    }
  }
}
</style>
