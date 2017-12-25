<template>
  <section class="page-container">
    <div>
      <h2 class="home-slogan">
        all episodes
      </h2>
      <div v-if="$store.state.queries.length > 0">
        <icon name="search" scale="1.5"></icon> 検索中:
        <button
          v-for="(query, i) in $store.state.queries"
          :key="query"
          class="query"
          @click="removeQuery(i)"
        >
          {{query}} <icon name="times" scale="1"></icon>
        </button>
      </div>
      <div v-if="episodes.length > 0">
        <div v-for="episode in episodes" :key="episode.title">
          <h3 :id="'ep' + episode.id">
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
      </div>
      <div v-else>
        No articles found.
      </div>
    </div>
  </section>
</template>

<script src="./index.ts" lang="ts">
</script>

<style lang="scss" scoped>
.query {
  padding: 0 10px;
  font-size: 16px;
  border-radius: 10px;
  height: 40px;
  line-height: 40px;
  outline: none;
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
