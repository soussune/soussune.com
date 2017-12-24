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

      <nuxt-link
        :to="episode.permalink"
        v-for="episode in topEpisodes"
        :key="episode.permalink"
        class="episode"
      >
        <h3 class="episode-title">
            {{ episode.title }}
        </h3>
        <div>
          {{ episode | date }}
        </div>
        <div>
          {{ episode | desc }}
        </div>
        <div class="actor-list">
          <img
            class="actor-list-item"
            v-for="actor in episode.actors"
            :key="actor.actorId"
            :to="actor.permalink"
            :src="actor.imageUrl"
            :title="actor.title"
          >
        </div>
      </nuxt-link>

      <div v-if="moreEpisode">
        <nuxt-link :to="{ path: '/episode', hash: moreEpisode.permalink}" class="more">
          <icon name="chevron-down"></icon> read more
        </nuxt-link>
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
.episode {
  display: block;
  text-decoration: none;
  background: #fff;
  border-radius: .6rem;
  box-shadow: 0 0.1rem 0.8rem rgba(0,0,0,.1);
  padding: 10px 20px;
  margin-top: 20px;
  transition: 0.2s ease-out;

  &:hover {
    color: inherit;
    box-shadow: 0.1rem 0.2rem 1.6rem rgba(0,0,0,.2);
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
      border: 2px solid #fff;
      box-sizing: content-box;
      background-origin: content-box;
      width: 40px;
      height: 40px;
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
</style>
