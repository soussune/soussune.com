<template>
  <section class="home-container">
    <div>
      <h2 class="home-slogan">
        episode
      </h2>
      <div v-for="post in posts" :key="post.title">
        <nuxt-link :to="post.permalink">
          {{ post.title }}
        </nuxt-link>
        <div>
          {{ post.published | date }}
        </div>
        <div>
          {{ post | desc }}
        </div>
        <div class="actor-list">
          <nuxt-link
            v-for="actor_id in post.actor_ids"
            :key="actor_id"
            :to="actors[actor_id].permalink"
            class="actor-list-item"
          >
            <img
              :src="actors[actor_id].image_url"
              :title="actors[actor_id].title"
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
