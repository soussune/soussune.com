<template>
  <div class="seekbar">

    <div class="total"></div>

    <div
      class="progress"
      :style="{transform: `scaleX(${progress})`}"
    ></div>

    <TouchRange
      :min="0"
      :max="duration"
      v-model="currentTime"
      class="slider"
    />

  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import TouchRange from '@miyaoka/vue-touch-range'

export default {
  components: {
    TouchRange
  },
  data() {
    return {}
  },
  methods: {
    commit(prop, payload) {
      this.$store.commit(`audio/${prop}`, payload)
    }
  },
  computed: {
    ...mapState('audio', ['canplay', 'paused', 'duration', 'buffered', 'title']),
    currentTime: {
      get() {
        return this.$store.state.audio.currentTime
      },
      set(val: number) {
        const p = val / this.duration
        this.progress = isNaN(p) ? 0 : p
        this.commit('seekTo', val)
      }
    },
    progress() {
      return this.currentTime / this.duration
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/_vars.scss';

$sliderHeight: 30px;
$trackHeight: 4px;

.seekbar {
  height: $sliderHeight;
  display: grid;
  grid-template-areas: 'stack';
  align-items: center;

  .total,
  .progress {
    grid-area: stack;
    height: $trackHeight;
    pointer-events: none;
  }

  .total {
    background: $player-seekbar-bg-color;
  }

  .progress {
    background: $player-seekbar-progress-color;
    transform-origin: left;
  }

  .slider {
    $track-color: transparent;
    $thumb-color: $player-seekbar-thumb-color;

    $thumb-height: $sliderHeight;
    $thumb-width: 8px;
    $thumb-radius: 0;
    $thumb-shadow-size: 0;
    $thumb-shadow-blur: 0;
    $thumb-border-width: 0;

    $track-height: 0;
    $track-radius: 0;
    $track-shadow-size: 0;
    $track-shadow-blur: 0;
    $track-border-width: 0;

    @import '~assets/css/_inputrange.scss';

    grid-area: stack;
    height: $sliderHeight;
    background: transparent;
    transform: translate3d(0, 0, 0);

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
