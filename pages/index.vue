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
    <section class="episodes">
      <div
        v-for="episode in episodes.slice(0,10)"
        :key="episode.permalink"
      >
        <h3>
          <nuxt-link :to="episode.permalink">
            {{ episode.title }}
          </nuxt-link>
        </h3>
        <div>
          {{ episode | date }}
        </div>
        <div>
          {{ episode | desc }}
        </div>
        <div class="actor-list">
          <nuxt-link
            v-for="actor in episode.actors"
            :key="actor.actorId"
            :to="actor.permalink"
            class="actor-list-item"
          >
            <img
              :src="actor.imageUrl"
              :title="actor.title"
            >
          </nuxt-link>
        </div>
      </div>
    </section>
  </section>
</template>

<script src="./index.ts" lang="ts">
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
.actor-list {
  margin-top: 8px;
  margin-left: 10px;

  &-item {
    margin-left: -12px;

    & img {
      border-radius: 50%;
      border: 2px solid #fff;
      box-sizing: content-box;
      background-origin: content-box;
      width: 40px;
      height: 40px;
    }
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
</style>
