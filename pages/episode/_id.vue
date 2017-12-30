<template>
  <main
    class="page-container"
    ref="content"
  >
    <header class="header">
      <h1 class="title"> {{ episode.title }} </h1>
      <p class="date">{{episode | date }}</p>
    </header>

    <section class="summary">

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
              <ActorIcon
                :actor="actor"
              />
              <p>{{ actor.title }}</p>
            </nuxt-link>
          </li>
        </ul>
      </div>

    </section>

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

    <nuxtent-body :body="episode.body" class="marked" />

  </main>
</template>

<script lang="ts" src="./_id.ts">
</script>

<style lang="scss" scoped>
@import '~assets/css/mixin/_mediaquery.scss';

.page-container {
  background: #fff;
  border-radius: .6rem;
  box-shadow: 0 1.2rem 3.6rem rgba(0,0,0,.2);
  padding: 80px 60px;
  margin: 40px 20px;
  position: relative;

  @include mq() {
    padding: 20px 10px 40px;
    margin: 20px 0px;
  }

}

.header {
  text-align: center;

  .title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 500;
    color: #35495e;

    @include mq() {
      font-size: 2.0rem;
    }
  }
}

.ep-links {
  & a {
    position: absolute;
    top: 160px;
    color: rgba(0,0,0,.2);

    &.newer {
      text-align: right;
    }

    $offset: -30px;
    &.older {
      left: $offset;
    }
    &.newer {
      right: $offset;
    }
    @include mq() {
      $offset: 0px;
      &.older {
        left: $offset;
      }
      &.newer {
        right: $offset;
      }
    }
  }
}

.summary {
  display: grid;
  margin-top: 40px;

  grid-template-columns: auto;
  grid-template-areas: "play" "desc" "actors";

  & h2 {
    font-size: 24px;
  }

  .header {
    grid-area: header;
  }
  .play {
    grid-area: play;
    position: relative;
    justify-self: center;

    button {
      transition: 0.4s ease-out;
      top: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      background: #34c322;
      color: #fff;
      font-size:18px;
      border: none;
      border-radius: 20%;
      width: 100px;
      height: 100px;
      outline: none;
      box-shadow: 0 0 20px rgba(0,0,0,.2);
      & > * {
        margin-left: 10px;
      }

      &.playing {
        border-radius: 5%;
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
          border-radius: 15%;
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

  @include mq() {

    &-item {
      min-width: 80px;
      font-size: 14px;

      & a {
        text-decoration: none;
      }

      & img {
        width: 60px;
        height: 60px;
      }

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
