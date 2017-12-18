<template>
  <section class="content-container">
    <img
      :src="actor.image_url"
      :title="actor.title"
      class="icon"
    >
    <h1 class="actor-title"> {{ actor.title }} </h1>
    <p>{{actor.description}}</p>
    <nuxtent-body :body="actor.body" />

    <h2>episodes</h2>
    <ul v-if="0 < episodes.length">
      <li
        v-for="ep in episodes"
        :key="ep.permalink"
        class="actor-list-item"
      >
        <nuxt-link
          :to="ep.permalink"
        >
          {{ ep.title }}
        </nuxt-link>
      </li>
    </ul>
    <p v-else>
      not appeared yet.
    </p>

  </section>
</template>

<script lang="ts" src="./_actor.ts">
</script>

<style>
.icon {
  width: 200px;
  height: 200px;
}
.content-container
{
  width: 38rem;
  margin: 0 auto
}

.actor-title
{
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
  color: #35495e;
}
</style>
