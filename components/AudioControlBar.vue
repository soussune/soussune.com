<template>
  <div class="container" :class="{ isHidden: isHidden }">
    <div v-if="false">
      <div class="play">
        <button
          @click="skip(skipBack)"
          class="skip"
        >
          «
        </button>
        <button
          class="pause"
          @click="paused = !paused"
        >
          {{ paused ? '▶' : '■' }}
        </button>
        <button
          @click="skip(skipFwd)"
          class="skip"
        >
          »
        </button>
      </div>
      <div>
        <span>{{currentTime | time}} / {{duration | time}}</span>
        <span>
          <button
            @click="muted = !muted"
            class="mute"
          >
          🔊
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
        <input
          class="playbackRate"
          type="range"
          step="any"
          min="1"
          max="3"
          v-model.number="playbackRate"
        >
        x {{ playbackRate.toFixed(1) }}
      </div>
    </div>
    <div class="currentTime">

      <div
        class="progress"
        :style="{ width: `${currentTime / duration * 100}%`}"
      ></div>

      <div class="title">{{ title }} [{{currentTime | time}} / {{duration | time}}]</div>

      <input
        type="range"
        step="any"
        min="0"
        :max="duration"
        v-model.number="currentTime"
        @touchmove="touchmove"
        @touchstart="touchmove"
      >

      <button @click="togglePlay" class="toggleplay" :class="{ canplay: canplay, paused: paused }">
        <icon :name="paused ? 'play' : (canplay ? 'pause' : 'spinner')" :spin="!canplay && !paused" scale="1.5"></icon>
      </button>

    </div>

  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'

export default {
  filters: {
    time(val: number) {
      return [Math.floor(val / 3600), Math.floor((val % 3600) / 60), Math.round(val % 60)]
        .map(v => v.toString().padStart(2, '0'))
        .join(':')
    }
  },
  data() {
    return {
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
  transition: 0.5s bottom cubic-bezier(.55, 0, .1, 1);

  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;

  box-shadow: 1rem 1.2rem 3.6rem rgba(0,0,0,.2);

  &.isHidden {
    bottom: -50px;
    opacity: 0;
  }
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

.currentTime{
  background: #8c8c8c;
  position: relative;

  $sliderHeight: 50px;
  height: $sliderHeight;
  // overflow: hidden;

  & > * {
    position: absolute;
    top: 0;
    bottom: 0;
    left: $sliderHeight;
  }

  & .toggleplay {
    left: 0px;
    width: $sliderHeight;
    border: none;
    background: #fff;
    color: #666;
    border-top: 1px solid #999;

    &.canplay {
    }
    &.paused {
      background: #34c322;
      color: #fff;
    }
  }

  & .progress {
    background: #3c3c3c;
    transition: all .1s cubic-bezier(.55, 0, .1, 1);
    pointer-events: none;
  }

  & .title {
    left: 0;
    right: 0;
    margin: auto;

    text-align: center;
    color:#fff;
    pointer-events: none;
  }

  $track-color: transparent;
  $thumb-color: #607d8b;

  $thumb-radius: 2px;
  $thumb-height: $sliderHeight;
  $thumb-width: 24px;
  $thumb-shadow-size: 4px;
  $thumb-shadow-blur: 4px;
  $thumb-shadow-color: rgba(0, 0, 0, .2);
  $thumb-border-width: 2px;
  $thumb-border-color: #eceff1;

  $track-height: $sliderHeight;
  $track-shadow-size: 0;
  $track-shadow-blur: 0;
  $track-border-width: 0;
  $track-radius: 0;

  @import '~assets/css/_inputrange.scss';

  & input {
    height: $sliderHeight;
    background: transparent;

    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
    &::-moz-focus-inner {
      border: 0;
    }
  }
}



</style>
