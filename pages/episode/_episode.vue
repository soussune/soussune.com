<template>
  <section class="content-container" ref="content">
    <h1 class="post-title"> {{ episode.title }} </h1>

    <h2>内容紹介</h2>
    {{ episode | desc }}

    <h2>出演者</h2>
    <ul class="actor-list">
      <li
        v-for="actor in episode.actors"
        :key="actor.title"
        class="actor-list-item"
      >
        <nuxt-link :to="actor.permalink">
          <img
            :src="actor.imageUrl"
            :title="actor.title"
          >
          <p>{{ actor.title }}</p>
        </nuxt-link>
      </li>
    </ul>

    <nuxtent-body :body="episode.body" class="marked" />
  </section>
</template>

<script lang="ts" src="./_episode.ts">
</script>

<style lang="scss" scoped>
.actor-list {

  &-item {
    display: inline-block;
    margin-bottom: 1rem;
    text-align: center;
    min-width: 100px;
    font-size: 14px;

    & a {
      text-decoration: none;
    }

    & img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
}
.content-container
{
  max-width: 38rem;
  margin: 0 auto
}

.post-title
{
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
  color: #35495e;
}
</style>
