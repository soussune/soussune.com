<template>
  <section class="page-container">
    <main class="episodes">
      <nuxt-link
        :to="episode.permalink"
        v-for="episode in topEpisodes"
        :key="episode.permalink"
        class="episode"
        :aria-label="episode.title"
      >
        <article>
          <header>
            <small>
              {{ episode | date }}
            </small>
            <h2 class="episode-title">
              {{ episode.title }}
            </h2>
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
    </main>

    <nav class="readmore" v-if="moreEpisode">
      <nuxt-link :to="{ path: '/episode', hash: 'ep' + moreEpisode.id }" class="readmore-link" aria-label="read more episodes">
        Read more <icon name="chevron-right"></icon>
      </nuxt-link>
    </nav>
  </section>
</template>

<script>
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
      return DateTime.fromMillis(episode.published, { zone: 'Asia/Tokyo' }).toFormat(
        'yyyy年MM月dd日'
      )
    },
    desc(episode) {
      return EpisodeHelper.desc(episode)
    }
  }
}
</script>

<style lang="scss" scoped>
$ep-trans: 0.2s ease-in;
$ep-bg: $clr-white-ll;
$ep-bg-hover: $clr-white-ll;

.episode {
  display: block;
  text-decoration: none;
  background: $ep-bg;
  border-radius: 0.3rem;
  box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15);
  padding: 10px 20px;
  margin-top: 20px;

  @include mq() {
    border-radius: 0;
  }

  &:first-child {
    margin-top: 0;
  }

  transition: $ep-trans;
  & * {
    transition: $ep-trans;
  }
  &:hover {
    color: inherit;
    background-color: $ep-bg-hover;
    box-shadow: none;
    box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05), 0 5px 18px 0 rgba(63, 63, 68, 0.15);
    transform: scale(1.01);

    & * {
      color: $clr-black-dd;
    }
    & .actor-list img {
      border: 3px solid $ep-bg-hover;
    }
  }

  &-title {
    margin-top: 0.2em;
    color: $clr-black-d;
    font-size: 1.6rem;
    margin-bottom: 0.2em;
    font-family: $font-round;

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
    border: 3px solid $ep-bg;
    box-sizing: content-box;
    background-origin: content-box;
    width: 60px;
    height: 60px;
  }
}

.readmore {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;

  &-link {
    text-decoration: none;
    color: $clr-black;
    font-size: 1.2rem;
    padding: 0.5rem;

    $line-color: $clr-black;
    @import '~assets/css/_hoverline.scss';

    &:hover {
      color: $clr-black;
    }
  }
}
</style>
