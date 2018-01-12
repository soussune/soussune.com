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
          <icon
            name="rotate-left"
            scale="1.5"
          ></icon>
        </button>
        <button
          class="pause"
          @click="togglePlay"
        >
          <icon
            :name="paused ? 'play' : 'pause'"
            scale="2.0"
          ></icon>
        </button>
        <button
          @click="skip(skipFwd)"
          class="skip"
        >
          <icon
            name="rotate-right"
            scale="1.5"
          ></icon>
        </button>
      </div>
      <div>
        <span>
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
          {{ volume.toFixed(1) }}
        </span>

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
        {{ playbackRate.toFixed(1) }}x
      </div>

      <AudioSeekBar />
    </div>

    <div
      @click="isOptions = !isOptions"
      class="base"
    >

      <div class="info">
        <div class="title">{{ title }}</div>
        <div class="time">
          <icon
            v-if="!paused"
            name="rotate-right"
            scale="1"
            spin
          ></icon>
          [{{currentTime | time}} / {{duration | time}}]</div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import AudioSeekBar from '~/components/AudioSeekBar.vue'

export default {
  components: {
    AudioSeekBar
  },
  filters: {
    time(val: number) {
      return [Math.floor(val / 3600), Math.floor((val % 3600) / 60), Math.round(val % 60)]
        .map(v => v.toString().padStart(2, '0'))
        .join(':')
    }
  },
  data() {
    return {
      isOptions: false,
      skipBack: -15,
      skipFwd: 15
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

button {
  outline: none;
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
  color: #000;
  background: #fff;
  // padding: 20px;
  border-top: 1px solid #000;
  width: 100%;

  position: absolute;
  z-index: -1;
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);

  &.isOptions {
    transform: translateY(-100%);
  }

  .play {
    text-align: center;

    & button {
      // border: none;
    }
    .skip {
      width: 50px;
      height: 50px;
      font-size: 30px;
      border-radius: 50px;
      outline: 0;
    }
    .pause {
      width: 100px;
      height: 50px;
      font-size: 30px;
      border-radius: 50px;
      outline: 0;
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
  background: #2f2921;

  padding: 8px;

  border-top: 1px solid #999;
  color: #fff;

  .info {
    grid-area: info;
    pointer-events: none;

    .title {
      font-size: 16px;
    }
    .time {
      font-size: 12px;
    }
  }
}
</style>
