<template>
  <section class="home-container">
    <div>
      <h2 class="home-slogan">
        actors
      </h2>

      <div v-for="actor in actors" :key="actor.title">
        <nuxt-link :to="actor.permalink">
          {{ actor.title }}
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  asyncData: async ({
    app
  }) => ({
    actors: await app.$content('/actors').query({ exclude: 'body' }).getAll()
  })
}
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
