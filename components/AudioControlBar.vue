<template>
  <div
    class="container"
    :class="{ isHidden, canplay, paused }"
  >

    <div
      class="options"
      :class="{isOptions}"
    >

      <div class="play">
        <button
          @click="skip(skipBack)"
          class="skip"
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
          @click="togglePlay"
        >
          <icon
            :name="paused ? 'play' : 'pause'"
            scale="4"
          ></icon>
        </button>
        <button
          @click="skip(skipFwd)"
          class="skip"
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

      <div class="volume">
        <button
          @click="muted = !muted"
          class="mute"
        >
          <icon
            name="volume-up"
          ></icon>
        </button>
        <input
          class="volume"
          type="range"
          step="any"
          min="0"
          max="1"
          v-model.number="volume"
          :disabled="muted"
        >
        <span>
          {{ volume.toFixed(1) }}
        </span>
      </div>

      <div class="rate">
        <icon
          name="tachometer"
          scale="1.5"
        ></icon>
        <input
          class="playbackRate"
          type="range"
          step="any"
          min="1"
          max="3"
          v-model.number="playbackRate"
        >
        <span>
          {{ playbackRate.toFixed(1) }}x
        </span>
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

    <div
      @click="isOptions = !isOptions"
      class="base"
    >
      <div class="playing">
        <AudioPlayingIcon
          :paused="paused"
        />
      </div>
      <div class="title">{{ title }}</div>
      <div class="arrow">
        <icon
          :name="isOptions ? 'caret-down' : 'caret-up'"
          scale="1.2"
        ></icon>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import AudioPlayingIcon from '~/components/AudioPlayingIcon.vue'
import AudioSeekBar from '~/components/AudioSeekBar.vue'

export default {
  components: {
    AudioPlayingIcon,
    AudioSeekBar
  },
  filters: {
    time(val: number) {
      return [
        Math.floor(val / 3600),
        ...[Math.floor((val % 3600) / 60), Math.round(val % 60)].map(v =>
          v.toString().padStart(2, '0')
        )
      ].join(':')
    }
  },
  data() {
    return {
      isOptions: false,
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
    touchmove(e) {
      e.preventDefault()
      const cw = e.target.clientWidth
      const rate = Math.max(0, Math.min(cw, e.touches[0].pageX - e.target.offsetLeft)) / cw
      this.commit('seekTo', rate * this.duration)
    },
    togglePlay() {
      this.commit('paused', !this.paused)
    }
  },
  computed: {
    ...mapState('audio', ['canplay', 'paused', 'duration', 'buffered', 'title']),
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
$track-height: 48px;

$base-bg-color: #2f2921;
$base-text-color: #fff;
$option-bg-color: #eee;
$option-text-color: #000;

button {
  outline: none;
  -webkit-appearance: none;
}

.stack {
  display: grid;
  grid-template-areas: 'stack';

  & > * {
    grid-area: stack;
    align-self: center;
    justify-self: center;
  }
}

.container {
  transition: 0.5s bottom cubic-bezier(0.55, 0, 0.1, 1);

  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;

  box-shadow: 1rem 1.2rem 3.6rem rgba(0, 0, 0, 0.2);

  &.isHidden {
    bottom: -50px;
    opacity: 0;
  }
}

.options {
  background: $option-bg-color;
  color: $option-text-color;

  padding: 10px;
  border-top: 1px solid #000;
  width: 100%;

  position: absolute;
  z-index: -1;
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);

  display: grid;
  grid-template-areas: 'volume rate' 'play play' 'seek seek';
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  justify-content: space-between;

  &.isOptions {
    transform: translateY(-100%);
  }

  .play {
    grid-area: play;

    display: grid;
    grid-template-columns: auto 150px auto;
    justify-content: center;

    & button {
      border: none;
      background: transparent;
      color: $option-text-color;
    }

    .skip-text {
      pointer-events: none;
      font-size: 10px;
    }
  }
  .volume {
    grid-area: volume;
  }
  .rate {
    grid-area: rate;
  }
  .seek {
    grid-area: seek;
    display: grid;
    grid-template-columns: 50px auto 50px;
    font-size: 12px;
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

.base {
  background: $base-bg-color;
  color: $base-text-color;
  padding: 16px;
  display: grid;
  grid-template-areas: 'playing title arrow';
  grid-template-columns: 24px auto 24px;
  grid-gap: 4px;
  justify-content: space-between;
  border: none;

  cursor: pointer;

  & > * {
    pointer-events: none;
    align-self: center;
  }
  .playing {
    grid-area: playing;
    justify-self: left;
  }
  .title {
    grid-area: title;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
  }
  .arrow {
    grid-area: arrow;
    justify-self: right;
  }
}
</style>
