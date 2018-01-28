<template>
  <section class="page-container">
    <header>
      <h1 class="title">
        エピソード
      </h1>
    </header>

    <div v-if="queries.length > 0">
      <icon name="search" scale="1.5"></icon> 検索中:（{{`${filteredEpisodes.length} / ${episodes.length}  件`}}）
      <button
        v-for="(query, i) in queries"
        :key="query"
        class="query"
        @click="removeQuery(i)"
      >
        {{query}} <icon name="times" scale="1"></icon>
      </button>
    </div>

    <main>
      <div class="card" v-if="filteredEpisodes.length > 0">
        <nuxt-link
          v-for="episode in filteredEpisodes"
          :key="episode.permalink"
          :to="episode.permalink"
          :id="'ep' + episode.id"
          class="episode"
        >
          <article>
            <h2 class="episode-header">
              {{ episode.title }}
            </h2>

            <div class="episode-date">
              {{ episode | date }}
            </div>

            <div class="episode-actor">
              <ActorIcon
                class="episode-actor-item"
                v-for="(actor, i) in episode.actors"
                :key="actor.actorId"
                v-model="episode.actors[i]"
              />
            </div>

            <div class="episode-topic">
              <span
                class="episode-topic-item"
                v-for="topic in episode.topics"
                :key="topic"
              >
                {{ topic }}
              </span>
            </div>

          </article>
        </nuxt-link>
      </div>
      <div v-else>
        No articles found.
      </div>
    </main>

  </section>
</template>

<script lang="ts">
import { DateTime } from 'luxon'
import { mapGetters } from 'vuex'
import * as EpisodeHelper from '~/helpers/EpisodeHelper.js'
import ActorIcon from '~/components/ActorIcon.vue'

export default {
  components: {
    ActorIcon
  },
  computed: {
    ...mapGetters(['queries']),
    episodesForFilter() {
      return this.episodes.map((episode) => ({
        ...episode,
        bodyText: episode.body && episode.body.replace(/<[^>]*?>/g, ' ')
      }))
    },
    filteredEpisodes() {
      if (this.queries.length === 0) return this.episodes
      return this.episodesForFilter.filter((ep) =>
        this.queries.every((q) => {
          const r = new RegExp(q.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&'), 'i')
          return (
            ep.actorIds.some((actorId) => actorId.match(r)) ||
            ep.actors.some((actor) => actor.title.match(r)) ||
            ep.topics.some((topic) => topic.match(r)) ||
            ep.title.match(r) ||
            ep.bodyText.match(r)
          )
        })
      )
    }
  },
  async asyncData({ app }) {
    return {
      episodes: await app.$contentLoader.getEpisodes()
    }
  },
  filters: {
    date(episode) {
      return DateTime.fromMillis(episode.published).toFormat('yyyy年MM月dd日')
    },
    desc(episode): string {
      return EpisodeHelper.desc(episode)
    }
  },
  methods: {
    removeQuery(i) {
      const queries = this.$store.getters.queries.slice()
      queries.splice(i, 1)
      this.$store.commit('searchText', queries.join(' '))
    }
  },
  destroyed() {
    this.$store.commit('searchText', '')
  },
  head() {
    return {
      title: 'エピソード'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/mixin/_mediaquery.scss';
@import '~assets/css/_vars.scss';

.title {
  color: $clr-white;
  text-align: center;
  margin-top: 3rem;
}
.card {
  border-radius: 3px;
  padding: 0;
  background-color: $clr-white-ll;
  box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15);
}

$ep-side-margin: 1.2rem;
$ep-hover-bg: $clr-white;
$ep-hover-clr: $clr-black-dd;

.episode {
  display: block;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
  position: relative;
  padding: 0 $ep-side-margin;
  margin-top: -1px;
  background-image: linear-gradient(left, $ep-hover-bg 50%, transparent 50%);
  background-position: right;
  background-size: 200% auto;

  @include mq() {
    padding: 0 0.4rem;
  }
  &:hover {
    background-position: 0;
    &,
    * {
      color: $ep-hover-clr !important;
    }
  }
  &:not(:last-child):before {
    content: '';
    position: absolute;
    height: 1px;
    bottom: 0;
    left: $ep-side-margin;
    right: $ep-side-margin;
    background-color: $clr-white-d;
  }

  &:first-child {
    padding-top: 1rem;
  }

  &:last-child {
    padding-bottom: 1rem;
  }

  article {
    display: grid;
    grid-template-areas: 'header actor' 'topic date';
    grid-template-columns: 1fr 200px;
    box-sizing: content-box;
    padding: 0.5rem;
    @include mq() {
      grid-template-columns: 1fr 100px;
    }
  }
  &-header {
    grid-area: header;
    font-size: 1.2rem;
    color: $clr-black-d;
  }
  &-actor {
    grid-area: actor;
    justify-self: end;
    align-self: center;

    &-item {
      margin-left: -12px;
      border-radius: 50%;
      border: 2px solid $clr-white-ll;
      box-sizing: content-box;
      background-origin: content-box;
      width: 30px;
      height: 30px;
    }
  }
  &-date {
    grid-area: date;
    font-size: 0.7rem;
    justify-self: end;
    align-self: end;
  }
  &-topic {
    grid-area: topic;
    font-size: 0.8rem;

    &-item {
      align-items: center;
      padding: 0 0.5rem;
      margin-right: 0.5rem;
      background-color: $clr-white-d;
      border-radius: 1rem;
      color: $clr-black;
    }
  }
}

.query {
  padding: 0 10px;
  font-size: 1rem;
  border-radius: 10px;
  height: 40px;
  line-height: 40px;
  outline: none;
  color: $clr-black-l;
}
</style>
