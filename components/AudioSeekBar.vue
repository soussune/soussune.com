<template>
  <div class="seekbar">

    <div
      class="progress"
      :style="{ width: `${progress * 100}%`}"
    ></div>

    <input
      type="range"
      step="any"
      min="0"
      :max="duration"
      v-model.number="currentTime"
      @touchmove="touchmove"
      @touchstart="touchmove"
      class="slider"
    >

  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'

export default {
  methods: {
    commit(prop, payload) {
      this.$store.commit(`audio/${prop}`, payload)
    },
    touchmove(e) {
      e.preventDefault()
      const cw = e.target.clientWidth
      const rate = Math.max(0, Math.min(cw, e.touches[0].pageX - e.target.offsetLeft)) / cw
      this.commit('seekTo', rate * this.duration)
    }
  },
  computed: {
    ...mapState('audio', ['canplay', 'paused', 'duration', 'buffered', 'title']),
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
    }
  }
}
</script>

<style lang="scss" scoped>
$sliderHeight: 30px;

.seekbar {
  background: #8c8c8c;
  height: 30px;

  display: grid;
  grid-template-areas: 'seek-child';

  .progress {
    grid-area: seek-child;
    height: 100%;
    background: #34c322;
    background: #64ce1b;
    transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
    pointer-events: none;
  }

  $track-color: transparent;
  $thumb-color: #607d8b;

  $thumb-radius: 2px;
  $thumb-height: $sliderHeight;
  $thumb-width: 24px;
  $thumb-shadow-size: 4px;
  $thumb-shadow-blur: 4px;
  $thumb-shadow-color: rgba(0, 0, 0, 0.2);
  $thumb-border-width: 2px;
  $thumb-border-color: #eceff1;

  $track-height: $sliderHeight;
  $track-shadow-size: 0;
  $track-shadow-blur: 0;
  $track-border-width: 0;
  $track-radius: 0;

  @import '~assets/css/_inputrange.scss';

  .slider {
    grid-area: seek-child;
    height: 100%;
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
