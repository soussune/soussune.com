<template>
  <section class="home-container">
    <div>
      <h2 class="home-slogan">
        episode
      </h2>
      <div v-for="episode in episodes" :key="episode.title">
        <h3>
          <nuxt-link :to="episode.permalink">
            {{ episode.title }}
          </nuxt-link>
        </h3>
        <div>
          {{ episode.published | date }}
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
  </section>
</template>

<script src="./index.ts" lang="ts">
</script>

<style lang="scss" scoped>
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
