<template>
  <section class="home-container">
    <div>
      <h2 class="home-slogan">
        actors
      </h2>

      <ul
        class="actor-list"
      >
        <li
          v-for="actor in actors"
          :key="actor.title"
          class="actor-list-item"
        >
          <nuxt-link
            :to="actor.permalink"
          >
            <img
              :src="actor.image_url"
              :title="actor.title"
            >
            <p>{{ actor.title }} ({{ actor.appears }})</p>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" src="./actors.ts">
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
      color: #000;
    }

    & img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
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
