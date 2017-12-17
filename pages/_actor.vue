<template>
  <section class="content-container">
    <img
      :src="post.image_url"
      :title="post.title"
      class="icon"
    >
    <h1 class="post-title"> {{ post.title }} </h1>
    <p>{{post.description}}</p>
    <nuxtent-body :body="post.body" />
  </section>
</template>

<script>
export default {
  asyncData: async ({ app, route, payload }) => ({
    post: await app.$content('/actors').get(route.path) || payload
  })
}
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

.post-title
{
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
  color: #35495e;
}
</style>
