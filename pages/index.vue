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
          Read more
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
.header {
  text-align: center;
  .title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 500;
    color: #35495e;
  }
}
.episodes {
  margin-top: 60px;
}
.episode {
  display: block;
  text-decoration: none;
  background: #ffffff;
  border-radius: .3rem;
  box-shadow: 0 0 0 1px rgba(63, 63, 68, .05), 0 1px 3px 0 rgba(63, 63, 68, .15);
  padding: 10px 20px;
  margin-top: 20px;
  transition: 0.2s ease-out;

  &:hover {
    color: inherit;
    background-color: #fafbfc;
  }

  &-title {
    margin-top: 0.2em;
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
      border: 3px solid #fff;
      box-sizing: content-box;
      background-origin: content-box;
      width: 60px;
      height: 60px;
    }
}

.home-slogan
{
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.home-links
{
  padding-top: 15px;
}
.more {
  margin-top:40px;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  background: #34c322;
  color: #fff;
  font-size:18px;
  border: none;
  border-radius: 40px;
  width: 200px;
  line-height: 40px;
  height: 40px;
  outline: none;

}

.readmore {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button {
  background: linear-gradient(180deg,#fff,#f9fafb);  fill: #637381;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.6rem;
  min-width: 2.6rem;
  margin: 0;
  padding: .7rem 1.6rem;
  border: 1px solid #c4cdd5;
  box-shadow: 0 1px 0 0 rgba(22,29,37,.05);
  border-radius: 3px;
  line-height: 1;
  color: #212b36;
  text-align: center;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  transition-property: background,border,box-shadow;
  transition-duration: .2s;
  transition-timing-function: cubic-bezier(.64,0,.35,1);

  &:active {
    background: linear-gradient(180deg,#f4f6f8,#f4f6f8);
    border-color: #c4cdd5;
    box-shadow: 0 0 0 0 transparent, inset 0 1px 1px 0 rgba(99,115,129,.1), inset 0 1px 4px 0 rgba(99,115,129,.2);
  }
  &:focus {
    outline: 0;
    // box-shadow: 0 0 0 0 transparent, inset 0 1px 1px 0 rgba(99,115,129,.1), inset 0 1px 4px 0 rgba(99,115,129,.2);

  }
  &:hover {
    background: linear-gradient(180deg,#f9fafb,#f4f6f8);
    border-color: #c4cdd5;

  }
}
</style>
