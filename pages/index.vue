<template>
  <section class="home-container">
    <div>
      <h2 class="home-slogan">
        soussune
      </h2>

      <div v-for="post in posts" :key="post.title">
        <nuxt-link :to="post.permalink">
          {{ post.title }}
        </nuxt-link>
        <div>
          {{ post.published | date }}
        </div>
        <div>
          <template v-if="post.description">
            {{ post.description }}
          </template>
          <template v-else>
            <span>{{ post.actor_ids, 'と' | join }}</span><span v-if="1 < post.actor_ids.length">の{{ post.actor_ids.length }}人で</span><span>{{ post.topics, '、' | join }}</span><span v-if="1 < post.topics.length">など</span><span>について話ました。</span>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  asyncData: async ({
    app
  }) => ({
    posts: await app.$content('/episode').query({ exclude: 'body' }).getAll()
  }),
  filters: {
    date (val) {
      return DateTime.fromSQL(val).toFormat('yyyy年MM月dd日')
    },
    join (array, val) {
      return array.join(val)
    }
  }
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
