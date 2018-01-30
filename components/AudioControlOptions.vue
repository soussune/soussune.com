<template>
  <div
    class="option-container"
  >
    <nuxt-link
      class="title"
      :to="pagePath"
      @click.native="$emit('close')"
      aria-label="current episode"
    >
      {{ title }}
    </nuxt-link>

    <div class="volumes">
      <div class="volume">
        <button
          @click.prevent="muted = !muted"
          class="mute"
          aria-label="mute"
        >
          <icon
            name="volume-up"
          ></icon>
        </button>

        <VolumeRange
          class="volume-slider"
          :min="0"
          :max="1"
          v-model="volume"
          :disabled="muted"
        />
        <span>
          {{ volume.toFixed(1) }}
        </span>
      </div>

      <div class="rate">
        <icon
          name="tachometer"
          scale="1.5"
        ></icon>

        <VolumeRange
          class="rate-slider"
          :min="1"
          :max="2"
          v-model="playbackRate"
        />

        <span>
          {{ playbackRate.toFixed(1) }}x
        </span>
      </div>

    </div>

    <div class="play">
      <button
        @click.prevent="skip(skipBack)"
        class="skip"
        aria-label="skip backward"
      >
        <span class="stack">
          <icon
            name="rotate-left"
            scale="3"
          ></icon>
          <span class="skip-text">{{Math.abs(skipBack)}}</span>
        </span>
      </button>
      <button
        class="pause"
        @click.prevent="togglePlay"
        aria-label="toggle play"
      >
        <icon
          :name="paused ? 'play' : 'pause'"
          scale="3"
        ></icon>
      </button>
      <button
        @click.prevent="skip(skipFwd)"
        class="skip"
        aria-label="skip forward"
      >
        <span class="stack">
          <icon
            name="rotate-right"
            scale="3"
          ></icon>
          <span class="skip-text">{{skipFwd}}</span>
        </span>
      </button>
    </div>

    <div class="seek">
      <div class="current">
        {{currentTime | time}}
      </div>
      <AudioSeekBar />
      <div class="total">
        {{duration | time}}
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import TouchRange from '@miyaoka/vue-touch-range'
import VolumeRange from '~/components/VolumeRange.vue'
import AudioSeekBar from '~/components/AudioSeekBar.vue'

export default {
  components: {
    TouchRange,
    VolumeRange,
    AudioSeekBar
  },
  filters: {
    time(val: number) {
      return [
        Math.floor(val / 3600),
        ...[Math.floor((val % 3600) / 60), Math.round(val % 60)].map((v) =>
          v.toString().padStart(2, '0')
        )
      ].join(':')
    }
  },
  data() {
    return {
      skipBack: -15,
      skipFwd: 30
    }
  },
  methods: {
    commit(prop, payload) {
      this.$store.commit(`audio/${prop}`, payload)
    },
    skip(val) {
      this.commit('seekTo', this.currentTime + val)
    },
    togglePlay() {
      this.commit('paused', !this.paused)
    }
  },
  computed: {
    ...mapState('audio', ['canplay', 'paused', 'duration', 'buffered', 'title', 'pagePath']),
    isHidden() {
      return this.$store.state.audio.src === ''
    },
    progress() {
      const p = this.currentTime / this.duration
      return isNaN(p) ? 0 : p
    },
    currentTime: {
      get() {
        return this.$store.state.audio.currentTime
      },
      set(val: number) {
        this.commit('seekTo', val)
      }
    },
    volume: {
      get() {
        return this.$store.state.audio.volume
      },
      set(val: number) {
        this.commit('volume', val)
      }
    },
    playbackRate: {
      get() {
        return this.$store.state.audio.playbackRate
      },
      set(val: number) {
        this.commit('playbackRate', val)
      }
    },
    muted: {
      get() {
        return this.$store.state.audio.muted
      },
      set(val: number) {
        this.commit('muted', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/mixin/_mediaquery.scss';
@import '~assets/css/_vars.scss';

$track-height: 48px;

.stack {
  display: grid;
  grid-template-areas: 'stack';

  & > * {
    grid-area: stack;
    align-self: center;
    justify-self: center;
  }
}

$clr-ui: $player-seek-progress;

.option-container {
  box-shadow: 1rem 1.2rem 3.6rem rgba(0, 0, 0, 0.2);

  background: $clr-white;
  color: $clr-ui;

  width: 100%;
  max-width: 900px;

  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;

  padding: 20px;
  border-radius: 20px;

  @include mq() {
    padding: 10px 0 20px 0;
    border-radius: 0;
  }

  .title {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    padding: 10px;
    display: block;
    text-decoration: none;
    transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
    color: $clr-ui;
    font-size: 1.5rem;

    @include mq() {
      font-size: 1rem;
    }

    &:hover {
      color: $clr-black-l;
    }
  }

  .volumes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin: 10px;

    > * {
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-gap: 4px;
    }
  }

  .play {
    display: grid;
    grid-template-columns: auto 150px auto;
    justify-content: center;

    & button {
      border: none;
      background: transparent;
      color: $clr-ui;
    }

    .skip-text {
      pointer-events: none;
      font-size: 0.6rem;
    }
  }
  .seek {
    display: grid;
    grid-template-columns: 50px auto 50px;
    font-size: 0.7rem;
    align-items: center;

    .current,
    .total {
      justify-self: center;
    }
  }

  .mute {
    width: 40px;
    height: 30px;
    font-size: 20px;
    border-radius: 10px;
    outline: 0;
  }
}
</style>
