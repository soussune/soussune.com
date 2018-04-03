<template>
  <main class="ep-item">
    <header class="header">
      <h1 class="title"> {{ episode.title }} </h1>
      <p class="date">{{episode | date }}</p>
    </header>

    <section class="summary">

      <div class="play">
        <audio-play-button
          :src="src"
          :title="episode.title"
        />
      </div>

      <div class="desc">
        <h2>内容紹介</h2>
        {{ desc }}
      </div>

      <div class="actors">
        <h2>出演者</h2>
        <ul class="actor-list">
          <li
            v-for="(actor,i) in episode.actors"
            :key="actor.title"
            class="actor-list-item"
          >
            <nuxt-link :to="actor.permalink" :aria-label="actor.title">
              <ActorIcon
                v-model="episode.actors[i]"
              />
              <p>{{ actor.title }}</p>
            </nuxt-link>
          </li>
        </ul>
      </div>

    </section>

    <nav class="ep-links">
      <nuxt-link
        v-if="episode.newer"
        :to="episode.newer.permalink"
        class="newer"
        aria-label="newer episode"
      >
        <icon name="arrow-left" scale="3"></icon>
      </nuxt-link>
      <nuxt-link
        v-if="episode.older"
        :to="episode.older.permalink"
        class="older"
        aria-label="oldre episode"
      >
        <icon name="arrow-right" scale="3"></icon>
      </nuxt-link>
    </nav>

    <twitter-widgets>
      <nuxtent-body :body="episode.body" class="marked" />
    </twitter-widgets>

  </main>
</template>

<script lang="ts">
import { DateTime } from 'luxon'
import * as EpisodeHelper from '~/helpers/EpisodeHelper.js'
import ActorIcon from '~/components/ActorIcon.vue'
import AudioPlayButton from '~/components/AudioPlayButton.vue'

export default {
  components: {
    ActorIcon,
    AudioPlayButton
  },
  filters: {
    date(episode) {
      return DateTime.fromMillis(episode.published, { zone: 'Asia/Tokyo' }).toFormat(
        'yyyy年MM月dd日'
      )
    }
  },
  async asyncData({ app, params }) {
    return {
      episode: await app.$contentLoader.getEpisode(params.id)
    }
  },
  computed: {
    desc() {
      return EpisodeHelper.desc(this.episode)
    },
    src(): string {
      return (
        'http://cdn.soussune.com.s3-ap-northeast-1.amazonaws.com/audio' + this.episode.audioFilePath
      )
    }
    // playing(): boolean {
    //   return this.selected && !this.paused
    // },
    // canplay(): boolean {
    //   return this.$store.state.audio.canplay
    // },
    // selected(): boolean {
    //   return this.$store.state.audio.src === this.src
    // },
    // paused(): boolean {
    //   return this.$store.state.audio.paused
    // }
  },
  head() {
    return {
      title: this.episode.title,
      meta: [
        {
          property: 'og:title',
          content: `soussune - ${this.episode.title}`,
          hid: 'ogTitle'
        },
        {
          property: 'og:description',
          content: this.desc,
          hid: 'ogDesc'
        }
      ]
    }
  }
  // methods: {
  //   commit(prop: string, payload: any): void {
  //     this.$store.commit(`audio/${prop}`, payload)
  //   },
  //   togglePlay(): void {
  //     if (this.selected) {
  //       this.commit('paused', !this.paused)
  //       return
  //     }

  //     this.commit('src', this.src)
  //     this.commit('title', this.episode.title)
  //     this.commit('pagePath', this.$route.path)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.ep-item {
  background: #fff;
  border-radius: 0.6rem;
  box-shadow: 0 1.2rem 3.6rem rgba(0, 0, 0, 0.2);
  padding: 80px 60px;
  margin: 40px 20px;
  position: relative;
  font-size: 1.1rem;

  @include mq() {
    padding: 20px 10px 40px;
    margin: 20px 0px;
  }
}

.header {
  text-align: center;

  .title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: $clr-black-dd;
    font-family: $font-round;

    @include mq() {
      font-size: 2rem;
    }
  }
}

.ep-links {
  & a {
    position: fixed;
    z-index: 10;
    top: 45%;
    color: rgba(0, 0, 0, 0.2);

    &.newer {
      text-align: right;
    }

    $offset: 10px;
    &.older {
      right: $offset;
    }
    &.newer {
      left: $offset;
    }
    @include mq() {
      position: absolute;
      top: 200px;
      $offset: 0px;
      &.older {
        right: $offset;
      }
      &.newer {
        left: $offset;
      }
    }
  }
}

.summary {
  display: grid;
  margin-top: 40px;

  grid-template-columns: auto;
  grid-template-areas: 'play' 'desc' 'actors';

  & h2 {
    font-size: 24px;
    font-family: $font-round;
    color: $clr-black-d;
  }

  .header {
    grid-area: header;
  }
  .play {
    grid-area: play;
    position: relative;
    justify-self: center;
  }

  .desc {
    grid-area: desc;
  }
  .actors {
    grid-area: actors;
  }
}

.actor-list {
  &-item {
    display: inline-block;
    margin-bottom: 1rem;
    text-align: center;
    min-width: 100px;
    font-size: 0.8rem;

    & a {
      text-decoration: none;
    }

    & img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }

  @include mq() {
    &-item {
      min-width: 80px;
      font-size: 0.7rem;

      & a {
        text-decoration: none;
      }

      & img {
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>
