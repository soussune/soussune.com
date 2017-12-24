<template>
  <main
    class="page-container"
    ref="content"
  >
    <section class="summary">

      <header class="header">
        <h1 class="title"> {{ episode.title }} </h1>
        <p class="date">{{episode | date }}</p>
      </header>

      <div class="play">
        <button @click="togglePlay" :class="{playing: playing, loading: !canplay }">
          <icon scale="3" :name="playing ? (canplay ? 'pause' : 'spinner') : 'play'" :spin="playing && !canplay"></icon>
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

      <nav class="ep-links">
        <nuxt-link
          v-if="episode.older"
          :to="episode.older.permalink"
          class="older"
        >
          <icon name="arrow-left" scale="3"></icon>
        </nuxt-link>
        <nuxt-link
          v-if="episode.newer"
          :to="episode.newer.permalink"
          class="newer"
        >
          <icon name="arrow-right" scale="3"></icon>
        </nuxt-link>
      </nav>

    </section>

    <nuxtent-body :body="episode.body" class="marked" />

  </main>
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
  grid-template-areas: "header header" "play desc" "play actors";
  grid-template-columns: 200px auto;
  margin-top: 40px;

  background: #fff;
  border-radius: .6rem;
  box-shadow: 0 1.2rem 3.6rem rgba(0,0,0,.2);
  padding: 10px 20px;
  position: relative;

  .ep-links {
    $offset: -20px;
    & a {
      position: absolute;
      top: 160px;
      color: rgba(0,0,0,.4);

      &.older {
        left: $offset;
      }
      &.newer {
        right: $offset;
        text-align: right;
      }
    }
  }

  & h2 {
    font-size: 24px;
  }

  .header {
    grid-area: header;
  }
  .play {
    grid-area: play;
    position: relative;

    button {
      transition: 0.4s ease-out;
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
      border-radius: 50%;
      width: 100px;
      height: 100px;
      outline: none;
      box-shadow: 0 0 20px rgba(0,0,0,.2);
      & > * {
        margin-left: 10px;
      }

      &.playing {
        border-radius: 10%;
        background: #fff;
        color: #666;
        border: #aaa 1px solid;
        animation: blink 3s infinite;
        & > * {
          margin-left: 0px;
        }

        @keyframes blink {
          50% {
            box-shadow: 0 0 30px rgba(0,0,0,.4);
            opacity: 0.5;
          }
        }

        &.loading {
          border-radius: 20%;
          transform: scale(0.9);
        }

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
