<template>
  <section class="content-container" ref="content">
    <h1 class="post-title"> {{ post.title }} </h1>
    <nuxtent-body :body="post.body" />
  </section>
</template>

<script lang="ts" src="./_episode.ts">
</script>

<style>
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
