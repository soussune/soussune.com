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
      </div>
    </div>
  </section>
</template>

<script src="./index.ts" lang="ts">
</script>

<style>
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
