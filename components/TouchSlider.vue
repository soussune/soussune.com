<template>
  <input
    type="range"
    step="any"
    :min="min"
    :max="max"
    :value="value"
    :disabled="disabled"
    @input="emit($event.target.value)"
    @touchmove="touchmove"
    @touchstart="touchmove"
    class="slider"
  >
</template>

<script lang="ts">
export default {
  props: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    value: { type: Number, required: true },
    disabled: { type: Boolean, default: false }
  },
  methods: {
    emit(val) {
      this.$emit('input', val)
    },
    touchmove(e) {
      e.preventDefault()
      const cw = e.target.clientWidth
      const rate = Math.max(0, Math.min(cw, e.touches[0].pageX - e.target.offsetLeft)) / cw
      console.log(e.target.offsetLeft, e.touches[0].pageX, e.target.offsetLeft + cw, rate)
      this.emit(rate * this.range + this.min)
    }
  },
  computed: {
    range() {
      return this.max - this.min
    }
  }
}
</script>

<style lang="scss" scoped>
$sliderHeight: 30px;

$track-color: #000;
$thumb-color: #607d8b;

$thumb-height: $sliderHeight;
$thumb-radius: 2px;
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
</style>
