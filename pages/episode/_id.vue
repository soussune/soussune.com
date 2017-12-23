<template>
  <section
    class="page-container"
    ref="content"
  >
    <nav class="ep-links">
      <div>
        <nuxt-link
          v-if="episode.older"
          :to="episode.older.permalink"
        >
          <icon name="chevron-circle-left" scale="2"></icon>
        </nuxt-link>
      </div>
      <div>
        <nuxt-link
          v-if="episode.newer"
          :to="episode.newer.permalink"
        >
          <icon name="chevron-circle-right" scale="2"></icon>
        </nuxt-link>
      </div>
    </nav>

    <header class="header">
      <h1 class="title"> {{ episode.title }} </h1>
      <p class="date">{{episode | date }}</p>
    </header>

    <section class="summary">

    <div class="play">
      <button @click="togglePlay" :class="{played: played}">
        <span v-if="played">
          <icon scale="2" :name="canplay ? 'pause' : 'spinner'" :spin="!canplay"></icon>
        </span>
        <span v-else><icon name="play" scale="2"></icon></span>
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
.ep-links {
  display: flex;
  justify-content: space-between;
}
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
      transition: .2s ease-out;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      background: #34c322;
      color: #fff;
      font-size:18px;
      border: none;
      border-radius: 20px;
      width: 100px;
      height: 70px;
      outline: none;

      &.played {
        background: #c35922
      }
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
</style>

<style lang="scss">
.marked {
  margin-top: 60px;

  h3 {
    font-size: 1.5rem;
    position: relative;
    margin-top: 1.5em;
    padding-bottom: 10px;
    font-weight: 400;
    color: #333;

    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 7px;
      background: repeating-linear-gradient(-45deg, #aed9bb,#aed9bb 2px,#fff 2px,#fff 4px);
    }
  }
}
</style>
