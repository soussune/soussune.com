<template>
  <div class="seekbar">

    <div class="bg"></div>

    <div
      class="progress"
      :style="{ transform: `scaleX(${progress})`}"
    ></div>

    <TouchRange
      class="slider"
      :class="{disabled}"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :value="value"
      @input="(newValue) => $emit('input', newValue)"
    />

  </div>
</template>

<script>
import TouchRange from '@miyaoka/vue-touch-range'

export default {
  components: {
    TouchRange
  },
  props: {
    value: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 1 },
    step: { type: [Number, String], default: 'any' },
    disabled: { type: Boolean, default: false }
  },
  computed: {
    range() {
      return this.max - this.min
    },
    progress() {
      return (this.value - this.min) / this.range
    }
  }
}
</script>

<style lang="scss" scoped>
$sliderHeight: 30px;
$trackHeight: 2px;

.seekbar {
  height: $sliderHeight;
  display: grid;
  grid-template-areas: 'stack';
  align-items: center;

  & > * {
    grid-area: stack;
  }

  .bg,
  .progress {
    height: $trackHeight;
    pointer-events: none;
  }

  .bg {
    background: $player-volume-bg-color;
  }

  .progress {
    background: $player-volume-progress-color;
    transform-origin: left;
  }

  .slider {
    $track-color: transparent;
    $thumb-color: $player-volume-thumb-color;

    $thumb-height: 20px;
    $thumb-width: $thumb-height;
    $thumb-radius: 50%;
    $thumb-shadow-size: 0px;
    $thumb-shadow-blur: 0px;
    $thumb-border-width: 1px;
    $thumb-border-color: $player-volume-thumb-border-color;

    $track-height: 0;
    $track-shadow-size: 0;
    $track-shadow-blur: 0;
    $track-border-width: 0;
    $track-radius: 0;

    @import '../assets/css/_inputrange.scss';

    height: $sliderHeight;
    background: transparent;
    transform: translate3d(0, 0, 0);

    &.disabled {
      opacity: 0.7;
    }
    &:hover:not(.disabled) {
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
