<template>
  <section class="page-container">
    <header>
      <h1 class="home-slogan">
        Episode list
      </h1>
    </header>

    <div v-if="$store.state.queries.length > 0">
      <icon name="search" scale="1.5"></icon> 検索中:（{{`${episodes.length}件`}}）
      <button
        v-for="(query, i) in $store.state.queries"
        :key="query"
        class="query"
        @click="removeQuery(i)"
      >
        {{query}} <icon name="times" scale="1"></icon>
      </button>
    </div>

    <main>
      <div v-if="episodes.length > 0">
        <nuxt-link
          :to="episode.permalink"
          v-for="episode in episodes"
          :key="episode.permalink"
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
              <img
                class="episode-actor-item"
                v-for="actor in episode.actors"
                :key="actor.actorId"
                :src="actor.imageUrl"
                :title="actor.title"
              >
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

<script src="./index.ts" lang="ts">
</script>

<style lang="scss" scoped>
@import '~assets/css/mixin/_mediaquery.scss';

.episode {
  text-decoration: none;

  article {
    display: grid;
    grid-template-areas: "header actor" "topic date";
    grid-template-columns: 1fr 200px;
    border-bottom: 1px solid;
    @include mq() {
      grid-template-columns: 1fr 100px;
    }

  }
  &-header {
    grid-area: header;
    font-size: 1.2rem;
  }
  &-actor {
    grid-area: actor;
    justify-self: end;

    &-item {
      margin-left: -12px;
      border-radius: 50%;
      border: 2px solid #fff;
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
  }
  &-topic {
    grid-area: topic;
    font-size: 0.8rem;

    &-item {
      align-items: center;
      padding: 0 0.5rem;
      background-color: #dfe3e8;
      border-radius: 1rem;
      color: #454f5b;
    }
  }

}

.query {
  padding: 0 10px;
  font-size: 16px;
  border-radius: 10px;
  height: 40px;
  line-height: 40px;
  outline: none;
}

.home-container
{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
</style>
