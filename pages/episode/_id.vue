<template>
  <section
    class="page-container"
    ref="content"
  >
    <header class="header">
      <h1 class="title"> {{ episode.title }} </h1>
      <p class="date">{{episode | date }}</p>
    </header>

    <section class="summary">

    <div class="play">
      <button @click="togglePlay">
        <span v-if="played">
          <icon :name="canplay ? 'pause' : 'spinner'" :pulse="!canplay"></icon> pause
        </span>
        <span v-else><icon name="play"></icon> play</span>
      </button>
    </div>

    <div class="desc">
      <h2>内容紹介</h2>
      {{ episode | desc }}
    </div>

    <div class="actors">
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
    </div>
    </section>

    <nuxtent-body :body="episode.body" class="marked" />
  </section>
</template>

<script lang="ts" src="./_id.js">
</script>

<style lang="scss" scoped>
.header {
  text-align: center;

  .title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 500;
    color: #35495e;
  }
}

.summary {
  display: grid;
  grid-template-areas: "play desc" "play actors";
  grid-template-columns: 200px auto;
  margin-top: 40px;

  background: #fff;
  border-radius: .6rem;
  box-shadow: 0 1.2rem 3.6rem rgba(0,0,0,.2);
  padding: 10px;

  & h2 {
    font-size: 24px;
  }

  .play {
    grid-area: play;
    position: relative;

    button {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      background: #34c322;
      color: #fff;
      font-size:18px;
      border-radius: 40px;
      width: 120px;
      height: 40px;
      outline: none;
    }
  }

  .desc {
    grid-area: desc;
  }
  .actors {
    grid-area: actors;
  }
}

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

.marked {
  margin-top: 60px;
}
</style>
